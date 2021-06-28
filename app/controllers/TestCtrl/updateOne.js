const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
  [{ name: "photo", maxCount: 1 }],
  cloudinaryStorage,
  async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return APIResponse.NotFound(res);

    const test = await models.test.findById(id);
    if (!test) return APIResponse.NotFound(res, "No test with that id");

    // Upload photo if enter by user
    if (req.files && req.files["photo"]) {
      req.body.photo = req.files["photo"][0].secure_url;
    }

    await test.set(req.body).save();

    return APIResponse.Ok(res, test);
  }
);
