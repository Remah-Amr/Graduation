const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");


module.exports = $baseCtrl(
    async (req, res) => {
        let drivers = await models.driver.fetchAll(
            req.allowPagination,
            {},
            {
                ...req.queryOptions,
                populate: ['owner','car']
            }
        )
        return APIResponse.Ok(res,drivers)
    }
);
