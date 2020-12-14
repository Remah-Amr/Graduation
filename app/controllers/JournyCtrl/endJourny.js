const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        // end journey 
        const car = await models._car.findById(req.me.car)
        car.current_journey = undefined
        car.current_driver = undefined

        await car.save()

        return APIResponse.Created(res, car)
    }
);
