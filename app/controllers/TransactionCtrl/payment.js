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

        const car = await models._car.findOne({ code: req.body.code })
        if(!car) return APIResponse.NotFound(res,'No car with that code')

        if(req.me.wallet < req.body.cost)
            return APIResponse.Forbidden(res,'You dont have enough money , recharge your wallet')

        req.me.wallet -= req.body.cost
        await req.me.save()
        

        // create new transactions
        const newTransaction = await new models.transaction({
            user: req.me.id,
            car: car.id,
            cost: req.body.cost,
            // seatNumber: req.body.seatNumber
        }).save()

        // push transaction in current journey 
        if(car.current_journey){
            const journey = await models.journey.findById(car.current_journey)
            journey.transactions.push(newTransaction._id)
            await journey.save()
        }

        return APIResponse.Created(res, newTransaction);
    }
);
