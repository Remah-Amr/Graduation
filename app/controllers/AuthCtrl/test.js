const $baseCtrl = require("../$baseCtrl");
const { APIResponse } = require("../../utils");
const models = require("../../models");
const _ = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
  await models.follow.deleteMany();
  return APIResponse.Ok(res, "Ok");
});
