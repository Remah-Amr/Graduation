const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");


module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {
        let cars = await models.driver.fetchAll(
            req.allowPagination,
            { owners: req.me._id },// were i can put this 
            {
                ...req.queryOptions,
                populate: 'cars'
            }
        )
        return APIResponse.Ok(res, cars)
    }
);
