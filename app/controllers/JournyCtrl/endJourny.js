const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
// rvry user enrolled just in one car by phone number that insure to our of
//  that user logged in by his number that number are enrolle under specific car or only one car 

module.exports = $baseCtrl(
    async (req, res) => {
        let newJourny
        const authUser = req.authenticatedUser;
        const user = await models._user.findById(authUser.id);
        // end journy 
        const car = await models.car.findOne({ _id: user.car })
        car.current_journy = undefined
        car.current_driver = undefined

        await car.save()

        const response = {
            car
        };

        return APIResponse.Created(res, response)
    }
);
