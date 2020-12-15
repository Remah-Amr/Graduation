const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");


module.exports = $baseCtrl(
    async (req, res) => {
        let emps = await models.employee.fetchAll(
            req.allowPagination,
            {},
            {
                ...req.queryOptions,
                populate: 'center'
            }
        )
        return APIResponse.Ok(res,emps)
    }
);
