const $baseCtrl = require("../$baseCtrl");
const { APIResponse } = require("../../utils");
const models = require("../../models");
const _ = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
  console.log(new Date());
  console.log(new Date(new Date().toUTCString()));
  return APIResponse.Ok(res, "Ok");
});
