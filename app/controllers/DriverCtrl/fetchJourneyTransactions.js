const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  let transactions = await models.transaction.fetchAll(
    false,
    {
      driver: req.me.id,
      car: req.me.current_car,
    },
    {
      ...req.queryOptions,
      populate: { path: "user", select: "username photo phone" },
    }
  );

  return APIResponse.Ok(res, transactions);
});
