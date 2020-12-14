const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
const smsService = require('../../services/sms');


module.exports = $baseCtrl(

    async (req, res) => {

        // Check if values not entered
        if (
            req.body.charge === undefined ||
            req.body.phone === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        if (!req.body.phone.match(/^\+201[0125][0-9]{8}$/))
            return APIResponse.BadRequest(res, 'Phone is invailed');
        // Check if phone Already Exist
        let existUser = await models._user.findOne({ phone: req.body.phone });
        if (!existUser) {
            return APIResponse.BadRequest(res, " user not found .");
        }
        let newShipping = req.body.charge
        // make wallet charged  and decrease our profit =1
        existUser.wallet += newShipping - 1

        // save new charge
        await existUser.save()


        const response = {
            userShiping: req.body.charge,
            userWallet: existUser.wallet

        };

        return APIResponse.Created(res, response);
    }
);
