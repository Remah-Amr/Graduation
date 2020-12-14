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
        // start journy 
        const car = await models.car.findOne({ _id: user.car })
        if (car.current_driver) {
            return APIResponse.Forbidden(res, " Car Alredy In Use .");
        }
        else if (car.current_journy) {
            return APIResponse.Forbidden(res, " journy alrady  started .");
        }
        else {
            car.current_driver = user.id
            newJourny = await new models.journy.create({
                driver: user.id,
                car: user.car
            }).save()
        }
        // this to used in transaction method to fech current journy 
        car.current_journy = newJourny._id

        const response = {
            newJourny
        };

        return APIResponse.Created(res, response)
    }
);
