const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");


module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {
        let journy = await models.journey.findById({ _id: req.params.journyId }).populate('transaction')

        return APIResponse.Ok(res, journy)
    }
);
