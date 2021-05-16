const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
module.exports = $baseCtrl(async (req, res) => {
  let weather = await models.weather.aggregate([
    {
      $sort: { createdAt: -1 },
    },
  ]);
  return APIResponse.Ok(res, weather);
});
