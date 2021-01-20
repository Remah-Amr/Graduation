const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.BadRequest(res);
  let order = await models.trustable.findById(id);
  if (!order)
    return APIResponse.NotFound(res, "No Trustable order  with that id");

  if (order.recipient !== req.me.id)
    return APIResponse.Forbidden(
      res,
      "You dont allow to update status of this order"
    );

  await order.set({ status: req.body.status }).save();

  let requester = await models._user.findById(order.requester);
  if (
    req.body.status === "accepted" &&
    requester.trustable.indexOf(req.me.id) === -1
  ) {
    requester.trustable.push(req.me.id);
    await requester.save();
  }

  return APIResponse.Ok(res, order);
});
