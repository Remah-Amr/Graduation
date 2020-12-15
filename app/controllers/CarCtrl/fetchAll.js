const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");


module.exports = $baseCtrl(
    async (req, res) => {
        let cars = await models._car.fetchAll(
            req.allowPagination,
            {},
            {
                ...req.queryOptions,
                populate: 'owner'
            }
        )
        return APIResponse.Ok(res,cars)
    }
);
