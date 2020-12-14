const jwt = require("jsonwebtoken");
const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(

    async (req, res) => {

        const authUser = req.authenticatedUser;
        const user = await models._user.findById(authUser.id);
        if (
            req.body.code === undefined ||
            req.body.seatNumber === undefined ||
            req.body.cost === undefined


        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        const car = await models.car.findOne({ code: req.body.code })

        // create new transactions
        const newTransaction = await new models.transaction.create({
            user: user.id,
            car: car.id,
            cost: req.body.cost,
            seatNumber: req.body.seatNumber
        }).save()

        // push transaction in current journy 
        const journy = await models.journy.findOne({ _id: car.current_journy })

        // push transaction to current journy
        journy.transaction.push(newTransaction._id)

        const response = {
            newTransaction,
        };

        return APIResponse.Created(res, response);
    }
);
