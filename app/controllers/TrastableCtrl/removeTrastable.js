const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        let trastId = req.params.trastId
        if (isNaN(trastId)) return APIResponse.BadRequest(res)
        let existTrastable = await models.trastable.findById({ _id: trastId })
        if (!existTrastable) return APIResponse.NotFound(res, 'No transaction  with that id')
        existTrastable.status = 'canceld'
        await existTrastable.save()
        // // pull from user collection 
        req.me.trastable.pull(existTrastable.recipient)
        // final step here create notification to receiver
        // ============notification============
        await req.me.save()
        await existTrastable.save()
        return APIResponse.Ok(res, existTrastable);
    }
);
