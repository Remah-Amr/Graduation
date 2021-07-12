const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const car = await models._car.findOne({ code: req.body.code });
  if (!car) return APIResponse.NotFound(res, "NO car with that id");

  if (req.me.cars.indexOf(car.id) === -1)
    return APIResponse.Forbidden(res, " you can not access this car !!");

  console.log(req.me.current_car);

  if (req.me.current_car) {
    return APIResponse.BadRequest(res, " you  have  car Already in use !!");
  }

  req.me.current_car = car._id;
  await req.me.save();
  return APIResponse.Ok(res, car);
});
