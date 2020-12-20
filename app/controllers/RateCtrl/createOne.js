const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  let routePath = req.route.path.split("/");
  let subjectType = routePath[1] === "drivers" ? "user" : "other";
  console.log("subjectType", subjectType);

  let ratedObject = subjectType === 'user' ? await models._user.findById(req.params.id) : 'other'
  if (!ratedObject)
    return APIResponse.NotFound(res, `No ${subjectType} with that id`);
  console.log("ratedObject", ratedObject);
  
  let newRate;
  let prevRate = await models.rate.findOne({
    user: req.me.id,
    subjectType,
    subject: ratedObject.id,
  });
  if (prevRate) {
    console.log("prevRate 1", prevRate);
    if(subjectType === 'user')
      req.body.car = ratedObject.current_car
    await prevRate.set(req.body).save();
    console.log("prevRate 2", prevRate);
  } else {
    if(subjectType === 'user')
      req.body.car = ratedObject.current_car
    req.body.user = req.me.id;
    req.body.subject = ratedObject.id;
    req.body.subjectType = subjectType;
    newRate = await new models.rate(req.body).save();
    console.log("New Rate", newRate);
  }

  // update rating for ratedObject
  let numberOfOneRate = await models.rate.countDocuments({
    subject: ratedObject.id,
    subjectType,
    rating: 1,
  });
  console.log("numberOf 1", numberOfOneRate);

  let numberOfTowRate = await models.rate.countDocuments({
    subject: ratedObject.id,
    subjectType,
    rating: 2,
  });
  console.log("numberOf 2", numberOfTowRate);

  let numberOfThreeRate = await models.rate.countDocuments({
    subject: ratedObject.id,
    subjectType,
    rating: 3,
  });
  console.log("numberOf 3", numberOfThreeRate);

  let numberOfFourRate = await models.rate.countDocuments({
    subject: ratedObject.id,
    subjectType,
    rating: 4,
  });
  console.log("numberOf 4", numberOfFourRate);
  let numberOfFiveRate = await models.rate.countDocuments({
    subject: ratedObject.id,
    subjectType,
    rating: 5,
  });
  console.log("numberOf 5", numberOfFiveRate);
  let countAll = await models.rate.countDocuments({
    subject: ratedObject.id,
    subjectType,
  });
  console.log("countAll", countAll);
  //calculate bast
  let bast =
    1 * numberOfOneRate +
    2 * numberOfTowRate +
    3 * numberOfThreeRate +
    4 * numberOfFourRate +
    5 * numberOfFiveRate;
  console.log("bast", bast);
  let newRating = bast / countAll;
  console.log("rate of object 1", ratedObject.rating);
  ratedObject.rating = newRating;
  await ratedObject.save();
  console.log("rate of object 2", ratedObject.rating);
  let response = prevRate ? prevRate : newRate
  await models.rate.populate(response,['subject'])
  return APIResponse.Ok(res, response);
});
