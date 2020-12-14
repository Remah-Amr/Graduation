
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
const smsService = require('../../services/sms');
const CodeGenerator = require('node-code-generator');
const generator = new CodeGenerator();

module.exports = $baseCtrl(
    cloudinaryStorage,
    async (req, res) => {

        // Check if values not entered
        if (
            req.body.address === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        //   to ensure genterate unique code to every center 
        let code;
        do {
            code = generator.generateCodes('#+#+#', 100)[0]
        } while (await models.center.findOne({ code: code }));
        req.body.code = code

        // save new center 
        newCenter = await new models.center(req.body).save();
        const options = {}
        const response = {
            newCenter,
        };

        return APIResponse.Created(res, response);
    }
);
