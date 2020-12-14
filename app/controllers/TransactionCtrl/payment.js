const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        if (
            req.body.code === undefined ||
            // req.body.seatNumber === undefined ||
            req.body.cost === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        const car = await models.car.findOne({ code: req.body.code })

        // create new transactions
        const newTransaction = await new models.transaction.create({
            user: req.me.id,
            car: car.id,
            cost: req.body.cost,
            // seatNumber: req.body.seatNumber
        }).save()

        // push transaction in current journey 
        const journey = await models.journey.findOne({ _id: car.current_journey })

        // push transaction to current journey
        journey.transactions.push(newTransaction._id)

        await journey.save()

        return APIResponse.Created(res, newTransaction);
    }
);
