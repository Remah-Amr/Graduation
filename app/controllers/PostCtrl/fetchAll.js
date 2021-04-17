const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");


module.exports = $baseCtrl(
    async (req, res) => {
        let typeDepth = req.params.postId ? 1 : req.params.commentId ? 2 : 0

        console.log(typeDepth)
        let posts = await models.post.fetchAll(
            req.allowPagination,
            { depth: typeDepth },
            {
                ...req.queryOptions,
                populate: [{ path: 'author', select: "username photo" }, 'sharedPost']
            }
        )
        return APIResponse.Ok(res, posts)
    }
);
