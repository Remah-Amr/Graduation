const { ModelBuildInstance } = require('twilio/lib/rest/autopilot/v1/assistant/modelBuild')
const $baseCtrl = require('../$baseCtrl')
const models = require('../../models')
const { APIResponse } = require('../../utils')

module.exports = $baseCtrl(
    async (req, re) => {
        const user = req.me

        let createdLocation = await models.geoLocation({
            name: req.body.name,
            location: req.body.location

        }).save()

        return APIResponse.Created(res, createdLocation);




    }
)