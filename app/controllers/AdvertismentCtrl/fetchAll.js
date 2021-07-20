const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
  [{ name: "photo", maxCount: 1 }],
  cloudinaryStorage,
  async (req, res) => {
    const ads = await models.ads.fetchAll(
      req.allowPagination,
      req.queryFilter,
      req.queryOptions
    );
    return APIResponse.Ok(res, ads);
  }
);
