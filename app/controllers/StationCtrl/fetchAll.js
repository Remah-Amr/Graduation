const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");

module.exports = $baseCtrl(async (req, res) => {
  let stations = await models.station.fetchAll(
    req.allowPagination,
    req.queryFilter,
    {
      ...req.queryOptions,
      select: "name",
    }
  );

  return APIResponse.Ok(res, stations);
});
