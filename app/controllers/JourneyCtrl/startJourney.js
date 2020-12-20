const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        // start journey    //   ============================== here  new data  updated
        const car = await models._car.findById(req.me.current_car)
        if (car.current_driver) {
            return APIResponse.Forbidden(res, " Car Alredy In Use .");
        }

        // if type of car = bus  careate seats and number of payment 
        let arr = []
        if (car.type === "bus") {
            for (let i = 1; i < car.numberOfSeats; i++) {
                arr.push({ seat: i, numberOfPayments: 0 })
            }

        }


        let newjourney = await new models.journey({
            driver: req.me.id,
            //=============== here  new data  updated 
            seats: arr,
            car: req.me.current_car
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
