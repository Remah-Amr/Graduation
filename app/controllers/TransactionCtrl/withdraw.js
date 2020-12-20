const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        if (
            req.body.code === undefined ||
            req.body.nationalId === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }

        const car = await models._car.findOne({ code: req.body.code })
        if (!car) return APIResponse.NotFound(res, 'No car with that code')

        const user = await models._user.findOne({ nationalId: req.body.nationalId })
        if (!user) return APIResponse.NotFound(res, 'No user with that nationalId')

        // ensure that user id owner  on that car
        if (user.role === 'owner') {
            if (car.owner !== user._id) {
                return APIResponse.Forbidden(res, "no car with this owner.");
            }
        }

        if (user.wallet < req.body.cost)
            return APIResponse.Forbidden(res, 'You dont have enough money on your wallet ')

        user.wallet -= req.body.cost
        await user.save()

        // create new transactions
        const newexchangeTransaction = await new models.exchangeTransaction({
            user: user._id,
            car: car._id,
            employee: req.me.id,
            center: req.me.center,
            cost: req.body.cost,
        }).save()

        return APIResponse.Created(res, newexchangeTransaction);
    }
);
