const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

module.exports = $baseCtrl(
    async (req, res) => {
        let typeDepth = req.params.postId ? 1 : req.params.commentId ? 2 : 0
        console.log(typeDepth)
        let posts = await models.post.fetchAll(
            req.allowPagination,
            {
                ...(typeDepth === 1 && { directParent: req.params.postId }),
                ...(typeDepth === 2 && { directParent: req.params.commentId }),
                depth: typeDepth
            },
            {
                ...req.queryOptions,
                populate: [{ path: 'author', select: "username photo" }, 'sharedPost']
            }
        )

        let all = posts.docs
        for (let i = 0; i < all.length; i++) {
            all[i] = all[i].toJSON({ authUser: req.me.id })
        }
        posts.docs = all



        return APIResponse.Ok(res, posts)
    }
);
