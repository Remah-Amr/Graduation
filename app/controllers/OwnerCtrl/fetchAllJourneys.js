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
            { car: req.body.carId },// were i can put this 
            {
                ...req.queryOptions,
                populate: 'car'
            }
        )
        return APIResponse.Ok(res, cars)
    }
);
