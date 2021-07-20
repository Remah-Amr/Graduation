const _ = require("lodash");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const user = req.authenticatedUser;
  const notifications = await models.notification.fetchAll(
    req.allowPagination,
    { ...req.queryFilter, targetUsers: { $in: [user.id] } },
    {
      ...req.queryOptions,
      sort: "-_id",
    }
  );

  const collection = req.allowPagination ? notifications.docs : notifications;
  for (let i = 0; i < collection.length; i++) {
    let notification = _.cloneDeep(collection[i]); // here copy values not referece
    // let notification = collection[i] // copy reference
    if (notification.seen) continue;
    notification.seen = true;
    await notification.save();
  }

  return APIResponse.Ok(res, notifications);
});
