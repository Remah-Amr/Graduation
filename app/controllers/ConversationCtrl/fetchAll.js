const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const conversations = await models.conversation.fetchAll(
    req.allowPagination,
    { users: req.me.id },
    {
      ...req.queryOptions,
      populate: [{ path: "users", select: "username photo" }, "lastMessage"],
    }
  );

  return APIResponse.Ok(res, conversations);
});
