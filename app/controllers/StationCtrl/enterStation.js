const $baseCtrl = require("../$baseCtrl");
const { station } = require("../../models");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        // start journey  
        const car = await models._car.findById(req.me.current_car)
        if (!car) return APIResponse.NotFound(res, 'You dont have selected car to start journey on it')

        if (car.transportType !== 'travel') {
            console.log(car.type)
            return APIResponse.BadRequest(res, " only travelling type");
        }
        const stationCar = await models.station.findById(car.station)
        console.log(stationCar.availableCarGoev1)
        if (!stationCar) return APIResponse.NotFound(res, 'staion not found')

        if (req.body.currentGove === stationCar.availableCarGoev1.gove1) {
            stationCar.availableCarGoev1.cars.push(car.id)
        }
        if (req.body.currentGove === stationCar.availableCarGoev2.gove2) {
            stationCar.availableCarGoev2.cars.push(car.id)
        }

        // stationCar.availableCar.push(car.id)
        await stationCar.save()
        return APIResponse.Created(res, stationCar)
    }
);
