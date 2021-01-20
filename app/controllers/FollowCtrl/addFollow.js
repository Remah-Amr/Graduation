const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.BadRequest(res);
  const user = await models._user.findById(id);
  if (!user) return APIResponse.NotFound(res, "No User with that id");
  let follow = await new models.follow({
    sender: req.me.id,
    receiver: id,
  }).save();

  return APIResponse.Created(res, follow);
});
