const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const moment = require("moment");

module.exports = $baseCtrl(async (req, res) => {
  const orders = await models.follow
    .find({
      receiver: req.me.id,
      createdAt: {
        $gte: moment().utc().subtract(5, "hour").toDate(),
      },
    })
    .populate("sender");
  return APIResponse.Ok(res, orders);
});
