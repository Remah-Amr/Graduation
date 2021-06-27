const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  let test = await new models.test(req.body).save();
  return APIResponse.Ok(res, test);
});
