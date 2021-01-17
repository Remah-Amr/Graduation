const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {

        // save new center 
        let centers = await models.governorate.fetchAll(
            req.allowPagination,
            {},
            req.queryOptions
        )
        return APIResponse.Ok(res, centers)
    }
);
