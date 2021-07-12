const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  // start journey
  const car = await models._car.findById(req.me.current_car);
  if (!car)
    return APIResponse.NotFound(
      res,
      "You dont have selected car to start journey on it"
    );
  if (car.current_driver !== req.me.id) {
    return APIResponse.Forbidden(res, "current_car !== car.current_driver");
  }
  if (car.transportType === "travel") {
    let stationCar = await models.station.findById(car.station);
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
  }
  let currentJourney = await models.journey.findOne({
    driver: req.me.id,
    car: req.me.current_car,
    status: "start",
  });
  if (currentJourney) return APIResponse.Created(res, currentJourney);
  let newjourney = await new models.journey({
    driver: req.me.id,
    car: req.me.current_car,
  }).save();
  // put current_journy under current driver
  req.me.current_journey = newjourney.id;
  await req.me.save();

  // this to used in transaction method to fech current journey
  // car.current_driver = req.me.id
  car.current_journey = newjourney._id;
  await car.save();

  return APIResponse.Created(res, newjourney);
});
