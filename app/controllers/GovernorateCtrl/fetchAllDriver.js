const $baseCtrl = require("../$baseCtrl");
const { station } = require("../../models");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  // start journey
  const car = await models._car.findById(req.me.current_car);
  if (!car)
    return APIResponse.NotFound(
      res,
      "You dont have selected car to select governorates on it"
    );
  const stationCar = await models.station
    .findById(car.station)
    .select("gov1 gov2")
    .populate("gov1 gov2");
  if (!stationCar) return APIResponse.NotFound(res, "staion not found");
  let response = [stationCar["gov1"], stationCar["gov2"]];
  return APIResponse.Ok(res, response);
});
