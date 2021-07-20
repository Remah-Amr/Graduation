const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const _ = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
  if (req.body.code === undefined || req.body.cost === undefined) {
    return APIResponse.BadRequest(res, "You have to fill all options .");
  }

  const car = await models._car.findOne({ code: req.body.code });
  if (!car) return APIResponse.NotFound(res, "No car with that code");

  if (car.type === "bus" && req.body.seatNumber === undefined)
    return APIResponse.BadRequest(res, "You have to provide seatNumber");

  let numberOfSeats = req.body.seatNumber ? req.body.seatNumber.length : 1;
  let totalCost = req.body.cost * numberOfSeats;
  let current_driver = await models._user.findById(car.current_driver);

  if (req.me.wallet < totalCost)
    return APIResponse.Forbidden(
      res,
      "You dont have enough money , recharge your wallet"
    );

  // create new transactions
  const newTransaction = await new models.transaction({
    user: req.me.id,
    car: car.id,
    cost: totalCost,
    ...(req.body.seatNumber && { seatNumber: req.body.seatNumber }),
    driver: car.current_driver,
  }).save();

  let obj = {};
  let journey = await models.journey.findById(car.current_journey);
  if (!journey) {
    journey = await new models.journey({
      driver: car.current_driver,
      car: car.id,
    }).save();
    current_driver.current_journey = journey.id;
    car.current_journey = journey._id;
    await car.save();
  }
  if (req.body.seatNumber) {
    if (journey.seats) obj = { ...journey.seats };
    for (let i = 0; i < req.body.seatNumber.length; i++) {
      let s = req.body.seatNumber[i];
      if (obj[s] === undefined) {
        obj[s] = 1;
      } else {
        obj[s] += 1;
      }
    }
  }
  journey.seats = obj;
  journey.transactions.push(newTransaction._id);
  await journey.save();

  // [TODO] send notification to current driver

  current_driver.wallet += totalCost;
  await current_driver.save();

  req.me.wallet -= totalCost;
  await req.me.save();

  await sendNotification({
    title: `واالعة ي صحبي  📦`,
    body: `${req.me.username} دفعلك ${totalCost} 😚 دلوقتي .. ابسط ي عم `,
    query: { _id: current_driver.id },
    user: req.me.id,
    subjectType: "admin",
    subject: 20,
  });

  return APIResponse.Created(res, newTransaction);
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
