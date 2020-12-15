const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        // start journey 
        const car = await models._car.findById(req.me.car)
        if (car.current_driver) {
            return APIResponse.Forbidden(res, " Car Alredy In Use .");
        }
        
        
        let newjourney = await new models.journey({
            driver: req.me.id,
            car: req.me.car
        }).save()

        req.me.current_journey = newjourney.id
        await req.me.save()
        
        // this to used in transaction method to fech current journey 
        car.current_driver = req.me.id
        car.current_journey = newjourney._id
        await car.save()

        return APIResponse.Created(res, newjourney)
    }
);
