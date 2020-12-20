const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {
        const id = parseInt(req.params.id)
        if(isNaN(id)) return APIResponse.BadRequest(res)
        const car = await models._car.findById(id)
        if(!car) return APIResponse.NotFound(res,'No car with that id')

        if(req.me.cars.indexOf(car.id) === -1)
        return APIResponse.Forbidden(res, ' you can not access this car !!');
   
        if (req.me.current_car) {
            return APIResponse.BadRequest(res, " you  have  car Already in use !!");
        }
        
        req.me.current_car = car._id
        await req.me.save()
        return APIResponse.Ok(res, car);
    }
);
