const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");


module.exports = $baseCtrl(
    async (req, res) => {

        // Check if values not entered
        if (
            req.body.charge === undefined ||
            req.body.phone === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        // Check if phone Already Exist
        let existUser = await models._user.findOne({ phone: req.body.phone });
        if (!existUser) {
            return APIResponse.BadRequest(res, " user not found .");
        }
        let newShipping = req.body.charge
        
        existUser.wallet += newShipping 

        // save new charge
        await existUser.save()

        return APIResponse.Created(res, existUser);
    }
);
