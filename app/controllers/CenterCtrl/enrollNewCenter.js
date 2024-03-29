const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {

        // save new center 
        let newCenter = await new models.center(req.body).save();
        return APIResponse.Created(res, newCenter);
    }
);
