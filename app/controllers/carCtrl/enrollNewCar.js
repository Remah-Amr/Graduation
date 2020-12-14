
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
            req.body.type === undefined ||
            req.body.number === undefined ||
            req.body.owner === undefined ||
            req.body.transporter === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        // if (!req.body.phone.match(/^\+201[0125][0-9]{8}$/))
        //     return APIResponse.BadRequest(res, 'Phone is invailed');

        // Check if phone Already Exist
        let existCar = await models.car.findOne({ number: req.body.number });
        if (existCar) {
            return APIResponse.BadRequest(res, " car Already in rolled  .");
        }
        let existOwner = await models.owner.findOne({ _id: req.body.owner });
        if (!existOwner) {
            return APIResponse.BadRequest(res, " owner not found .");
        }

        //   to ensure genterate unique code to every car 
        let code;
        do {
            code = generator.generateCodes('#+#+#', 100)[0]
        } while (await models.car.findOne({ code: code }));
        req.body.code = code

        // Upload photo if enter by user
        if (req.files && req.files["photo"]) {
            req.body.photo = req.files["photo"][0].secure_url;
        }

        let newCar
        // save car under transporterType 
        if (req.body.transporter === 'public') {
            newCar = await new models.public(req.body).save();
        }
        if (req.body.transporter === 'travel') {
            newCar = await new models.travel(req.body).save();
        }
        const options = {}
        const response = {
            newCar,
        };

        return APIResponse.Created(res, response);
    }
);
