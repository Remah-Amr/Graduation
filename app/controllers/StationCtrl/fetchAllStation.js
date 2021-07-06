const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");


module.exports = $baseCtrl(
    async (req, res) => {
        let gove = req.params.gove
        let lineCar = req.params.stationId
        console.log(lineCar)
        // let station = await models.station.fetchAll(
        //     req.allowPagination,
        //     {
        //         _id: lineCar

        //     }, {
        //     ...req.queryOptions,
        //     populate: ['carsLine']
        // }

        // )
        let station = await models.station.findById(lineCar).populate('carsLine')
        return APIResponse.Ok(res, station.carsLine)
    }
);
