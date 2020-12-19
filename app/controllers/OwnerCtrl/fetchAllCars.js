const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");


module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {

        let cars = await models._car.fetchAll(
            req.allowPagination,
            { owner: req.me.id },// were i can put this 
            {
                ...req.queryOptions,
                populate: 'owner'
            }
        )
        return APIResponse.Ok(res, cars)
    }
);
