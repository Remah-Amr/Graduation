const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.NotFound(res);
  const station = await models.station.findById(id);
  if (!station) return APIResponse.NotFound(res, "No Station With that id");

  let car = await models.travel.findOne({ station: id });
  if (car)
    return APIResponse.Forbidden(
      res,
      "Cant remove station since car related it exists"
    );
  await station.delete();

  return APIResponse.NoContent(res);
});
