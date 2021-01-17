const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {

        // save new Governorat 
        let newGovernorate = await new models.governorate(req.body).save();
        return APIResponse.Created(res, newGovernorate);
    }
);
