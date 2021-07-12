const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");

module.exports = $baseCtrl(async (req, res) => {
  let gove = req.params.gove;
  let lineCar = req.params.stationId;
  console.log(lineCar);
  let station = await models.station.findById(lineCar).populate("carsLine");
  if (!station) return APIResponse.NotFound(res, "staion not found");
  console.log(station);

  return APIResponse.Ok(res, station.carsLine);
});
