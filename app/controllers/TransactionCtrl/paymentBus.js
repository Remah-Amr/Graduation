const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        if (
            req.body.code === undefined ||
            req.body.seatNumber === undefined ||
            req.body.cost === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        const car = await models._car.findOne({ code: req.body.code })
        if (!car) return APIResponse.NotFound(res, 'No car with that code')

        // find current journy
        const journeySeats = await models.journey.findOne({ _id: car.current_journey })
        if (!journeySeats) return APIResponse.NotFound(res, 'No journy with that ID !!')


        // check if totla cost > user balance 
        let totalSats = 0
        let totalCost = 0
        for (let i = 0; i <= req.body.seatNumber.length; i++) {
            totalSats += 1

        }
        totalCost = totalSats * req.body.cost

        if (req.me.wallet < totalCost)
            return APIResponse.Forbidden(res, 'You dont have enough money , recharge your wallet')

        // increase numberof pay to any seatNumber on journy  
        for (let j = 0; j <= req.body.seatNumber.length; j++) {
            for (let i = 0; i <= journeySeat.seats.length; i++) {
                if (journeySeat.seats[i].seat === req.body.seatNumber[j]) { //seat = 1 , seatnumber = 1
                    journeySeat.seats[i].numberOfPayments += 1 // increase no.payment 1
                    await journeySeats.save()
                }
            }
        }

        req.me.wallet -= req.body.cost
        await req.me.save()

        // [TODO] send notification to current driver
        if (car.current_driver) {
            let current_driver = await models._user.findById(car.current_driver)
            current_driver.wallet += req.body.cost
            await current_driver.save()
        }

        // create new transactions
        const newTransaction = await new models.transaction({
            user: req.me.id,
            car: car.id,
            cost: req.body.cost,
            seatNumber: req.body.seatNumber
        }).save()

        // push transaction in current journey 
        if (car.current_journey) {
            const journey = await models.journey.findById(car.current_journey)
            journey.transactions.push(newTransaction._id)
            await journey.save()
        }

        return APIResponse.Created(res, newTransaction);
    }
);







