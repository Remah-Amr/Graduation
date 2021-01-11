const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const _ = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return APIResponse.NotFound(res);

  const conversation = await models.conversation.findById(id);
  if (!conversation)
    return APIResponse.NotFound(res, "No Conversation with that id");

  if (conversation.users.indexOf(req.me.id) === -1)
    return APIResponse.Forbidden(res, "Dont allow to view these messages");

  let key = _.findKey(conversation.meta, { user: req.me.id });
  if (key !== undefined) {
    conversation.meta[key].countOfUnseenMessages = 0;
    await conversation.save();
  }

  const messages = await models.message.fetchAll(
    req.allowPagination,
    {
      conversation: id,
    },
    {
      ...req.queryOptions,
      sort: "-createdAt",
      populate: { path: "user", select: "username photo" },
    }
  );

  return APIResponse.Ok(res, messages);
});
