const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        const carId = parseInt(req.params.carId)
        if (isNaN(carId)) return APIResponse.BadRequest(res)
        let existCar = await models._car.findById(carId).populate(['owner', 'cars', 'gove1', 'gove2']);
        if (!existCar) {
            return APIResponse.BadRequest(res, " car not found .");
        }
        return APIResponse.Ok(res, existCar)
    }






);
