const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        await models._user.populate(req.me,'cars')
        return APIResponse.Ok(res,req.me.cars)
    }
);
