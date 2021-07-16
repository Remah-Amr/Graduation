const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  let drivers = await models.driver.fetchAll(
    req.allowPagination,
    req.queryFilter,
    {
      ...req.queryOptions,
      populate: ["owners", "cars"],
    }
  );
  return APIResponse.Ok(res, drivers);
});
