const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");
const _ = require("lodash");



module.exports = $baseCtrl(
    async (req, res) => {
        const user = req.me
        const id = parseInt(req.params.postId);
        if (isNaN(id)) return APIResponse.NotFound(res);
        console.log(id)


        await models.post.updateOne({ _id: id }, { $pull: { reactions: { user: user.id } } })


        return APIResponse.Ok(res);









    })



