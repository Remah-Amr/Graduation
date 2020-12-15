const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
const bcrypt = require("bcryptjs");

module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 1 }],
    cloudinaryStorage,
    async (req, res) => {

        // Check if values not entered
        if (
            req.body.username === undefined ||
            req.body.password === undefined ||
            req.body.phone === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        if (!req.body.phone.match(/^\+201[0125][0-9]{8}$/))
            return APIResponse.BadRequest(res, 'Phone is invailed');

        // Check if phone Already Exist
        let existPhone = await models._user.findOne({ phone: req.body.phone });
        if (existPhone) {
            return APIResponse.BadRequest(res, " phone Already in use .");
        }
        // make owner enabled by default
        req.body.enabled = true

        // Encrypt Password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;

        // Upload photo if enter by owner  
        if (req.files && req.files["photo"]) {
            req.body.photo = req.files["photo"][0].secure_url;
        }


        // save owner to db  role = owner
        const newUser = await new models.owner(req.body).save();

        return APIResponse.Created(res, newUser);
    }
);
