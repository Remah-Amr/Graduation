const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {

        const car = await models._car.findOne({ code: req.body.code })
        if(!car) return APIResponse.NotFound(res,"NO car with that id")

        return APIResponse.Ok(res, car);
    }
);
