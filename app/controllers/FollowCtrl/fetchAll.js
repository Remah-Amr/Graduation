const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const orders = await models.follow
    .find({ receiver: req.me.id })
    .populate("sender");
  return APIResponse.Ok(res, orders);
});
