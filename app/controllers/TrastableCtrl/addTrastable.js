const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

// return 403 if already exist before
module.exports = $baseCtrl(async (req, res) => {
  // step 1)
  let receiver = req.body.phone;
  let existReceiver = await models._user.findOne({ phone: receiver });
  if (!existReceiver)
    return APIResponse.NotFound(res, "No user with that phone");
  // to ensure user not sent request to specific user more thane 1 time
  let prevReq = await models.trustable.findOne({
    requester: req.me.id,
    recipient: existReceiver.id,
    status: { $in: ["pending", "accepted"] },
  });
  if (prevReq) return APIResponse.Ok(res, prevReq);
  // creat trustable document with pending status
  const trastReq = await new models.trustable({
    requester: req.me.id,
    recipient: existReceiver.id,
  }).save();
  // final step here create notification to receiver
  // ============notification============
  return APIResponse.Ok(res, trastReq);
});
