const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const user = req.authenticatedUser;

  const notificationsCount = await models.notification.countDocuments({
    targetUsers: user.id,
    seen: false,
  });
  const response = { count: notificationsCount };

  return APIResponse.Ok(res, response);
});
