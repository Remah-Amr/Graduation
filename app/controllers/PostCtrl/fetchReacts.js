const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

module.exports = $baseCtrl(
    async (req, res) => {

        const id = parseInt(req.params.postId);
        if (isNaN(id)) return APIResponse.NotFound(res);

        let post = await models.post.findById(id).
            populate({ path: 'reactions.user', select: "username photo" })

        let postReactions = post.reactions


        return APIResponse.Ok(res, postReactions)
    }
);
