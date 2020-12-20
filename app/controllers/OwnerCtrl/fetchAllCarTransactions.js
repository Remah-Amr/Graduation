const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");


module.exports = $baseCtrl(
    async (req, res) => {
        const id = parseInt(req.params.carId)
        if(isNaN(id)) return APIResponse.BadRequest(res)

        const car = await models._car.findById(id)
        if(!car) return APIResponse.NotFound(res,'No car with that id')

        if(car.owner !== req.me.id)
            return APIResponse.Forbidden(res,'You dont allow to view these transactions')
        // here add filter with driver 

        let transactions = await models.transaction.fetchAll(
            req.allowPagination,
            { car: id },
            {
                ...req.queryOptions,
                populate: 'driver'
            }
        )
        return APIResponse.Ok(res, transactions)
    }
);
