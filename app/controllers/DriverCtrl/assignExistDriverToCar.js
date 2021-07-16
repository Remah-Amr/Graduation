const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const cid = parseInt(req.params.cid);
  if (isNaN(cid)) return APIResponse.BadRequest(res);
  const did = parseInt(req.params.did);
  if (isNaN(did)) return APIResponse.BadRequest(res);

  const car = await models._car.findById(cid);
  if (!car) return APIResponse.NotFound(res, "No car with that id ");

  const driver = await models.driver.findById(did);
  if (!driver) return APIResponse.NotFound(res, "No driver with that id");
  if (driver.driverType !== car.transportType)
    return APIResponse.Forbidden(res, "Cant assign public to travel");
  if (driver.cars.indexOf(cid) === -1) driver.cars.push(cid);
  if (driver.owners.indexOf(car.owner) === -1) driver.owners.push(car.owner);
  await driver.save();

  return APIResponse.Ok(res, driver);
});
