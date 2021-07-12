const $baseCtrl = require("../$baseCtrl");
const { station } = require("../../models");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const _ = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
  // start journey
  const car = await models._car.findById(req.me.current_car);
  if (!car)
    return APIResponse.NotFound(
      res,
      "You dont have selected car to start journey on it"
    );

  if (car.transportType !== "travel") {
    console.log(car.type);
    return APIResponse.BadRequest(res, " only travelling type");
  }
  const stationCar = await models.station.findById(car.station);
  console.log(stationCar.availableCarGoev1);

  if (!stationCar) return APIResponse.NotFound(res, "staion not found");

  if (true) {
    let key = stationCar.availableCarGoev1.cars;
    for (let i = 0; i < key.length; i++) {
      if (key[i] == car.id) {
        key.splice(i, 1);
        break;
      }
    }
  }
  if (true) {
    let key = stationCar.availableCarGoev2.cars;
    for (let i = 0; i < key.length; i++) {
      if (key[i] == car.id) {
        key.splice(i, 1);
        break;
      }
    }
  }
  await stationCar.save();
  return APIResponse.Created(res, stationCar);
});
