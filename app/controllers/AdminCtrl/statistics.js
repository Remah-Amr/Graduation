const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");

module.exports = $baseCtrl(async (req, res) => {
  let cars = await models._car.estimatedDocumentCount();
  let centers = await models.center.estimatedDocumentCount();
  let stations = await models.station.estimatedDocumentCount();
  let ads = await models.ads.estimatedDocumentCount();
  let rates = await models.rate.estimatedDocumentCount();
  let transaction = await models.transaction.estimatedDocumentCount();
  let users = await models._user.estimatedDocumentCount();
  let posts = await models.post.countDocuments({ depth: 0 });
  let response = {
    cars,
    centers,
    stations,
    ads,
    rates,
    transaction,
    users,
    posts,
  };
  return APIResponse.Ok(res, response);
});
