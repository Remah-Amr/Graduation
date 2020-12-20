const $baseCtrl = require('../$baseCtrl');
const { APIResponse } = require('../../utils');
const models = require('../../models')
module.exports = $baseCtrl(async (req, res) => {
 let journey = await models.journey.findById(31)
 return APIResponse.Ok(res,journey)
});