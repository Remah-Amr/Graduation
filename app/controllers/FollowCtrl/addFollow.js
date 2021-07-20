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
  await sendNotification({
    title: `📯 بص بسررررعة `,
    body: `${user.username} عاوزك تعمله تراكينج عشان محتاجك  😚`,
    query: { _id: id },
    user: req.me.id,
    subjectType: "admin",
    subject: 20,
  });
  if (prevFollow) return APIResponse.Ok(res, prevFollow);
  let follow = await new models.follow({
    sender: req.me.id,
    receiver: id,
  }).save();

  return APIResponse.Created(res, follow);
});

const sendNotification = async (data) => {
  try {
    // Send Notification
    const clients = await models._user.find(data.query);
    const targetUsers = clients.map((user) => user.id);
    const notification = await new models.notification({
      title: data.title,
      body: data.body,
      user: data.user,
      targetUsers: targetUsers,
      subjectType: data.subjectType,
      subject: data.subject,
    }).save();

    const receivers = clients;
    for (let i = 0; i < receivers.length; i++) {
      await receivers[i].sendNotification(
        notification.toFirebaseNotification()
      );
    }
  } catch (error) {
    console.log(error);
  }
};
