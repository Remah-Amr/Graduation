const $baseCtrl = require('../$baseCtrl');
const { APIResponse } = require('../../utils');
const models = require('../../models')
module.exports = $baseCtrl(async (req, res) => {
 let users = await models._user.find()
 for(let i = 0;i < users.length;i++){
     if(users[i].role === 'admin' || users[i].role === 'employee' || users[i].role === 'client')
        continue
    if(users[i].role === 'driver'){
        await users[i].set({current_journey:undefined,current_car: undefined,owners:[],cars:[]}).save()
    }
    if(users[i].role === 'owner'){
        await users[i].set({current_journey:undefined,current_car: undefined,cars:[]}).save()
    }
 }

 return APIResponse.Ok(res,'Ok')
});