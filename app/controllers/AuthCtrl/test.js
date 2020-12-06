const $baseCtrl = require('../$baseCtrl');
const { APIResponse } = require('../../utils');
const models = require('../../models')
module.exports = $baseCtrl(async (req, res) => {
  let user = await models._user.findOne({phone: req.body.phone})
//   let user = await models._user.find()
 if(user){
    await user.delete()
 }
   return APIResponse.Ok(res,'A7la msa')     
});