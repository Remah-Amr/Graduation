const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        if (
            req.body.phone === undefined ||
            req.body.cost === undefined
        ) {
            return APIResponse.BadRequest(res, "You have to fill all options .");
        }
        const user = await models._user.findOne({ phone: req.body.phone })
        if (!user) return APIResponse.NotFound(res, 'No user with that phone')

        if (req.me.wallet < req.body.cost)
            return APIResponse.Forbidden(res, 'You dont have enough money on your wallet ')

        req.me.wallet -= req.body.cost
        user.wallet += req.body.cost
        await req.me.save()
        await user.save()

        // create new transactions
        const newBalanceTransfer = await new models.balanceTransfer({
            sender: req.me.id,
            receiver: user._id,
            cost: req.body.cost,
        }).save()

        return APIResponse.Created(res, newBalanceTransfer);
    }
);
