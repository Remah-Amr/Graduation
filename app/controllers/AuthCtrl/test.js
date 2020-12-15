const $baseCtrl = require('../$baseCtrl');
const { APIResponse } = require('../../utils');
const models = require('../../models')
module.exports = $baseCtrl(async (req, res) => {
 let user = await models.journey.find().populate('transactions')
 return APIResponse.Ok(res,user)
});