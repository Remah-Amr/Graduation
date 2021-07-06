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

        let existStation
        if (req.body.transportType === "travel") {
            // ============================
            if (req.body.gove1 === undefined || req.body.gove2 === undefined) {
                return APIResponse.BadRequest(res, "You have to fill all options");
            }
            const gove1 = parseInt(req.body.gove1)
            const gove2 = parseInt(req.body.gove2)
            if (isNaN(gove1) || isNaN(gove2)) return APIResponse.BadRequest(res)
            let existGov1 = await models.governorate.findById(gove1);
            let existGov2 = await models.governorate.findById(gove2);
            console.log(existGov2)
            console.log(existGov1)
            if (!existGov1 || !existGov2) {
                return APIResponse.BadRequest(res, " governorte not found .");
            }
            existStation = await models.station.findById(req.body.station);
            if (!existStation) return APIResponse.BadRequest(res, " station not found .");

        }
        let newCar = await new models[type](req.body).save()
        if (newCar.transportType === "travel") {

            existStation.carsLine.push(newCar._id)
            await existStation.save()
        }
        // new updated data =======
        existOwner.cars.push(newCar._id)
        await existOwner.save()


        return APIResponse.Created(res, newCar);
    }
);
