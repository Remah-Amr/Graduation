const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const conversationModel = require("../../models/conversation.model");

module.exports = $baseCtrl(async (req, res) => {
  let gover1 = req.params.from;
  let gover2 = req.params.to;
  let carStation;
  // console.log(lineCar)
  let stationLine = await models.station
    .findOne({
      $or: [
        { gov1: gover1, gov2: gover2 },
        { gov1: gover2, gov2: gover1 },
      ],
    })
    .populate([
      {
        path: "availableCarGoev1.cars",
        populate: { path: "owner", select: "rating username photo phone" },
      },
      {
        path: "availableCarGoev2.cars",
        populate: { path: "owner", select: "rating username photo phone" },
      },
    ]);
  if (!stationLine) return APIResponse.NotFound(res, "staion not found");
  if (stationLine.availableCarGoev1.gove1 == gover1) {
    carStation = stationLine.availableCarGoev1.cars;
  }
  if (stationLine.availableCarGoev2.gove2 == gover1) {
    carStation = stationLine.availableCarGoev2.cars;
  }

  return APIResponse.Ok(res, carStation);
});
