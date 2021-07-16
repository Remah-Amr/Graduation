const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const moment = require("moment");

module.exports = $baseCtrl(async (req, res) => {
  await req.me
    .set({
      lastSeen: {
        coordinates: req.body.coordinates,
        time: moment.utc(),
      },
    })
    .save();

  return APIResponse.Ok(res, req.me.lastSeen);
});
