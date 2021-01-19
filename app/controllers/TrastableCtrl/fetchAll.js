const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        let trastables = await models.trastable.fetchAll(
            req.allowPagination,
            {},// were i can put this 
            {
                ...req.queryOptions,
                populate: ['requester', 'recipient']
            }
        )
        return APIResponse.Ok(res, trastables)
    }
);
