const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {

        // step 1)
        let trastId = req.params.trastId
        let existTrastable = await models.trastable.findById({ _id: trastId })
        if (!existTrastable) return APIResponse.NotFound(res, 'No transaction  with that id')
        existTrastable.status = 'accepted'
        // ============notification============ requester are accepted your request 

        await existTrastable.save()
        return APIResponse.Ok(res, existTrastable);
    }
);
