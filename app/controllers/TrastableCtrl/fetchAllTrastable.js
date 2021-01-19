const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");


module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {
        let myTrastReq = await models.trastable.fetchAll(
            req.allowPagination,
            {
                requester: req.me._id,
                status: 'accepted'
            },
            {
                ...req.queryOptions,
                populate: ['requester', 'recipient']
            }
        )
        return APIResponse.Ok(res, myTrastReq)
    }
);
