const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {

        // step 1)
        let receiver = req.body.phone
        let existReceiver = await models._user.findOne({ phone: receiver })
        if (!existReceiver) return APIResponse.NotFound(res, 'No user with that phone')
        // to ensure user not sent request to specific user more thane 1 time
        if (req.me.trastable.indexOf(existReceiver.id) !== -1)
            return APIResponse.Forbidden(res, ' User already trastabled in your list !!');
        // creat trastable document with pending status 
        const trastReq = await new models.trastable({
            requester: req.me.id,
            recipient: existReceiver.id,
            status: 'pending'
        })
        // push trast in two user 
        await req.me.trastable.push(existReceiver.id)
        // final step here create notification to receiver
        // ============notification============
        await req.me.save()
        await trastReq.save()
        return APIResponse.Ok(res, trastReq);
    }
);
