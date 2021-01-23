const $baseCtrl = require("../$baseCtrl");
const { APIResponse } = require("../../utils");
const models = require("../../models");
const _ = require("lodash");

module.exports = $baseCtrl(async (req, res) => {
  let x = {
    plans: {
      Basic: 10,
      Premium: 20,
      PremiumPlus: 30,
    },
  };
  let y = {
    plansHours: {
      Basic: 100,
      Premium: 200,
      PremiumPlus: 300,
    },
  };
  let obj = {};
  obj.name = x[Object.keys(x)[0]];
  return APIResponse.Ok(res, obj);
});
