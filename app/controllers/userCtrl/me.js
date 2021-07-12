const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");

const { APIResponse } = require("../../utils");

// [TODO] refactor this with html page
module.exports = $baseCtrl(async (req, res) => {
  await models._user.populate(req.me, 'current_car')
  return APIResponse.Ok(res, req.me);
});
