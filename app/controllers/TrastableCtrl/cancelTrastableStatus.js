const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {

        // step 1)
        let trastId = req.params.trastId
        let existTrastable = await models.trastable.findById({ _id: trastId })
        if (!existTrastable) return APIResponse.NotFound(res, 'No transaction  with that id')
        existTrastable.status = 'canceld'
        let requester = await models._user.findById({ _id: existTrastable.requester })
        requester.trastable.pull(existTrastable.recipient)
        await requester.save()

        await existTrastable.save()
        return APIResponse.Ok(res, existTrastable);
    }
);
