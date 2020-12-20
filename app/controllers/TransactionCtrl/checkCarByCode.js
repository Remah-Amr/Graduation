const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(
    async (req, res) => {

        const car = await models._car.findOne({ code: req.body.code })
        if (!car) return APIResponse.NotFound(res, "NO car with that id")
        let x = 0
        // find exist car  on driver or owners car  
        for (let i = 0; i < req.me.cars.length; i++) {
            if (req.me.cars[i] === car._id) {
                x = 1
            }
        }
        if (x === 1) {
            if (req.me.current_car) {
                return APIResponse.BadRequest(res, " you  current car Already used !! .");
            }
            req.me.current_car = car._id
            return APIResponse.Ok(res, car);
        }

        return APIResponse.Forbidden(res, ' you can not access this car !!');
    }
);
// now this function check exist car && check this car exist on current_driver cars it's achieve two goals