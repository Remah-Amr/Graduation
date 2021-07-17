const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const moment = require("moment");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.BadRequest(res);
  const user = await models._user.findById(id);
  if (!user) return APIResponse.NotFound(res, "No User with that id");
  let prevFollow = await models.follow.findOne({
    receiver: id,
    sender: req.me.id,
    createdAt: {
      $gte: moment().utc().subtract(5, "hour").toDate(),
    },
  });
  if (prevFollow) return APIResponse.Ok(res, prevFollow);
  let follow = await new models.follow({
    sender: req.me.id,
    receiver: id,
  }).save();

  return APIResponse.Created(res, follow);
});
