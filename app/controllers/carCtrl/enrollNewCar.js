
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
            req.body.carType === undefined ||
            req.body.carNumber === undefined ||
            req.body.owner === undefined ||
            req.body.transportType === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        // if (!req.body.phone.match(/^\+201[0125][0-9]{8}$/))
        //     return APIResponse.BadRequest(res, 'Phone is invailed');

        // Check if phone Already Exist
        let existPhone = await models._user.findOne({ carNumber: req.body.carNumber });
        if (existPhone) {
            return APIResponse.BadRequest(res, " car Already in rolled  .");
        }
        let existOwner = await models._user.findOne({ _id: req.body.owner });
        if (!existOwner) {
            return APIResponse.BadRequest(res, " owner not found rolled  .");
        }

        req.body.code = generator.generateCodes('#+#+#', 100)[0]


        // Upload photo if enter by user
        if (req.files && req.files["photo"]) {
            req.body.photo = req.files["photo"][0].secure_url;
        }

        let newCar
        // save car under transporterType 
        if (req.body.transportType === 'public') {
            newCar = await new models.public(req.body).save();
        }
        if (req.body.transportType === 'travel') {
            newCar = await new models.travel(req.body).save();
        }
        const options = {}
        const response = {
            newCar,
        };

        return APIResponse.Created(res, response);
    }
);
