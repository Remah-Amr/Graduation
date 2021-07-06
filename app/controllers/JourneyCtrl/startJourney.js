const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        // start journey  
        const car = await models._car.findById(req.me.current_car)
        if (!car) return APIResponse.NotFound(res, 'You dont have selected car to start journey on it')
        if (car.current_driver) {
            return APIResponse.Forbidden(res, " Car Alredy In Use .");
        }
        if (car.type === 'travel') {
            let stationCar = await models.station.findOne({
                $and: [{ from: car.from }, { to: car.to }]
            })
            if (stationCar.availableCar[0] != car.id) {
                return APIResponse.BadRequest(res, " It's not your turn  .");

            }



        }


        let newjourney = await new models.journey({
            driver: req.me.id,
            car: req.me.current_car,
        }).save()
        // put current_journy under current driver
        req.me.current_journey = newjourney.id
        await req.me.save()

        // this to used in transaction method to fech current journey 
        car.current_driver = req.me.id
        car.current_journey = newjourney._id
        await car.save()


        return APIResponse.Created(res, newjourney)
    }
);
