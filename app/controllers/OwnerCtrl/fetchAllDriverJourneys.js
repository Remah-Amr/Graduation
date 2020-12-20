
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");


module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {

        let cars = await models.journey.fetchAll(
            req.allowPagination,
            { user: req.params.driverId },// were i can put this 
            {
                ...req.queryOptions,
                populate: 'driver'
            }
        )
        return APIResponse.Ok(res, cars)
    }
);
