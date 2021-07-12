const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const car = await models._car.findOne({ code: req.body.code });
  if (!car) return APIResponse.NotFound(res, "NO car with that id");
  if (car.current_driver && car.current_driver !== req.me.id) {
    return APIResponse.Forbidden(res, "car.current_driver !== req.me.id");
  }

  if (req.me.cars.indexOf(car.id) === -1)
    return APIResponse.Forbidden(res, " you can not access this car !!");

  if (req.me.current_car && req.me.current_car !== car.id) {
    return APIResponse.BadRequest(res, " you  have  car Already in use !!");
  }

  req.me.current_car = car._id;
  await req.me.save();
  car.current_driver = req.me.id;
  await car.save();
  return APIResponse.Ok(res, car);
});
