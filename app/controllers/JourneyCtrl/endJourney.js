const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        // end journey 
        const car = await models._car.findById(req.me.current_car)
        if (!car.current_journey) return APIResponse.Forbidden(res, 'NO Journey started for this car')
        if (car.current_driver !== req.me.id) return APIResponse.Forbidden(res, 'Dont allow to end this journey')

        let journey = await models.journey.findById(car.current_journey)
        await journey.set({ status: 'end' }).save()

        car.current_journey = undefined
        car.current_driver = undefined

        await car.save()

        req.me.current_journey = undefined
        req.me.current_car = undefined
        await req.me.save()

        return APIResponse.Created(res, journey)
    }
);
