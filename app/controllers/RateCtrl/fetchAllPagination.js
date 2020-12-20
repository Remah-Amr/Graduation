const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  const carId = parseInt(req.params.id)
  if(isNaN(carId)) return APIResponse.BadRequest(res)
  const car = await models._car.findById(carId)
  if(!car) return APIResponse.NotFound(res,'No Car with that id')

  if(car.owner !== req.me.id)
    return APIResponse.Forbidden(res,'Dont allow te see rates on this car')

  let rates = await models.rate.fetchAll(
    req.allowPagination,
    {  car: carId },
    {
      ...req.queryOptions,
      sort: "-createdAt",
      populate: {path:'subject' , select: 'username photo phone'},
    }
  );
  return APIResponse.Ok(res, rates);
});
