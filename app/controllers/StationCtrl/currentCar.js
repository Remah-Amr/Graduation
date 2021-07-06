const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        // cosnsole.log('here')
        let currentCar
        let stationLine = await models.station.findOne({
            $or: [
                { gov1: req.body.from, gov2: req.body.to }, { gov1: req.body.to, gov2: req.body.from }
            ]
        })
        if (!stationLine) return APIResponse.NotFound(res, 'You dont have selected car to start journey on it')
        if (stationLine.availableCarGoev1.gove1 === req.body.from) {
            currentCar = stationLine.availableCarGoev1.cars[0]

        }
        if (stationLine.availableCarGoev2.gove2 === req.body.from) {
            currentCar = stationCar.availableCarGoev2.cars[0]
        }

        // this to used in transaction method to fech current journey 
        let car = await models._car.findById({ _id: currentCar })
        if (!car) return APIResponse.NotFound(res, 'not found current car')

        return APIResponse.Created(res, car)
    }
);
