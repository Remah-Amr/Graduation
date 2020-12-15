const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const CodeGenerator = require('node-code-generator');
const generator = new CodeGenerator();

module.exports = $baseCtrl(
    async (req, res) => {

        
        // Check if phone Already Exist
        let existCar = await models._car.findOne({ number: req.body.number });
        if (existCar) {
            return APIResponse.BadRequest(res, " car Already in use  .");
        }
        const ownerId = parseInt(req.body.owner)
        if(isNaN(ownerId)) return APIResponse.BadRequest(res)
        let existOwner = await models.owner.findById(ownerId);
        if (!existOwner) {
            return APIResponse.BadRequest(res, " owner not found .");
        }
        
        //   to ensure genterate unique code to every car 
        let code;
        do {
            code = generator.generateCodes('#+#+#', 40)[0]
        } while (await models._car.findOne({ code: code }));
        req.body.code = code
        
        let type = req.body.transportType
        let newCar = await new models[type](req.body).save()

        existOwner.car = newCar.id
        await existOwner.save()
        
        return APIResponse.Created(res, newCar);
    }
);
