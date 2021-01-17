const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const CodeGenerator = require('node-code-generator');
const generator = new CodeGenerator();

module.exports = $baseCtrl(
    async (req, res) => {


        // Check if car Already Exist
        let existCar = await models._car.findOne({ number: req.body.number });
        if (existCar) {
            return APIResponse.BadRequest(res, " car Already in use  .");
        }
        const ownerId = parseInt(req.body.owner)
        if (isNaN(ownerId)) return APIResponse.BadRequest(res)
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
        if (req.body.transportType === "travel") {
            // ============================
            if (req.body.from === undefined || req.body.to === undefined) {
                return APIResponse.BadRequest(res, "You have to fill all options");
            }
            const govFromId = parseInt(req.body.from)
            const govToId = parseInt(req.body.to)
            if (isNaN(govFromId) || isNaN(govToId)) return APIResponse.BadRequest(res)
            let existGovFrom = await models.governorate.findById(govFromId);
            let existGovTo = await models.governorate.findById(govToId);
            console.log(existGovTo)
            console.log(existGovFrom)
            if (!existGovFrom || !existGovTo) {
                return APIResponse.BadRequest(res, " governorte not found .");
            }
        }
        let newCar = await new models[type](req.body).save()
        // new updated data =======
        existOwner.cars.push(newCar._id)
        await existOwner.save()


        return APIResponse.Created(res, newCar);
    }
);
