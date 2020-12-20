const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");



module.exports = $baseCtrl(
    async (req, res) => {
        let owners = await models.owner.fetchAll(
            req.allowPagination,
            {},
            {
                ...req.queryOptions,
                populate:'cars'
            }
        )
        return APIResponse.Ok(res,owners)
    }
);
