const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");


module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {
        let owners = await models.owner.fetchAll(
            req.allowPagination,
            {},
            {
                ...req.queryOptions,
                populate:'car'
            }
        )
        return APIResponse.Ok(res,owners)
    }
);
