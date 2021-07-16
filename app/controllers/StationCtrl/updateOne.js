const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.NotFound(res);
  const station = await models.station.findById(id);
  if (!station) return APIResponse.NotFound(res, "No Station With that id");

  delete req.body.gov1;
  delete req.body.gov2;
  delete req.body.carsLine;
  delete req.body.availableCarGoev1;
  delete req.body.availableCarGoev2;

  await station.set(req.body).save();

  return APIResponse.Ok(res, station);
});
