const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  let routePath = req.route.path.split("/");
  let query = {
    ...(routePath[1] === "requester" && {
      requester: req.me.id,
      status: "accepted",
    }),
    ...(routePath[1] === "recipient" && {
      recipient: req.me.id,
      status: "pending",
    }),
  };
  let orders = await models.trustable
    .find(query)
    .populate(["recipient", "requester"]);
  return APIResponse.Ok(res, orders);
});
