const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  // Check if car Already Exist
  let existStation = await models.station.findOne({
    $or: [
      { $and: [{ gov1: req.body.gov1 }, { gov2: req.body.gov2 }] },
      { $and: [{ gov1: req.body.gov2 }, { gov2: req.body.gov1 }] },
    ],
  });
  if (existStation) {
    return APIResponse.BadRequest(res, " station Already exist  .");
  }
  // let goveData1 = await models.governorate.findById(req.body.gove1);
  // let goveData2 = await models.governorate.findById(req.body.gove2);
  // let newStation = {
  //     name: req.body.name,
  //     gov1: req.body.gov1,
  //     gov2: req.body.gov2,
  // }
  let newStation = await new models.station(req.body).save();
  console.log("here");
  newStation.availableCarGoev1.gove1 = newStation.gov1;
  newStation.availableCarGoev2.gove2 = newStation.gov2;
  await newStation.save();
  return APIResponse.Created(res, newStation);
});
