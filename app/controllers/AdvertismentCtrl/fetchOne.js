const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
  [{ name: "photo", maxCount: 1 }],
  cloudinaryStorage,
  async (req, res) => {
    const ads = await models.ads.aggregate([
      { $sample: { size: 1 } },
      {
        $addFields: {
          id: "$_id",
        },
      },
      {
        $project: {
          id: 1,
          _id: 0,
          content: 1,
          photo: 1,
        },
      },
    ]);
    return APIResponse.Ok(res, ads[0]);
  }
);
