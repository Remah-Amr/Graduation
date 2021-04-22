const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    async (req, res) => {
        const user = req.me
        const id = parseInt(req.params.postId);
        if (isNaN(id)) return APIResponse.NotFound(res);

        let post = await models.post.findById(id);
        if (!post) return APIResponse.NotFound(res, 'post not found');
        for (let i = 0; i < post.reactions.length; i++) {
            if (post.reactions[i].user === user.id) {// if user alredy maked reaction we update it 
                post.reactions[i].flavor = req.body.flavor
                await post.save()
                post = post.toJSON({ authUser: req.me.id })
                return APIResponse.Created(res, post);
            }
        }
        let createdReaction = {
            user: user.id,
            flavor: req.body.flavor,
        }
        post.reactions.push(createdReaction)
        await post.save()
        post = post.toJSON({ authUser: req.me.id })
        return APIResponse.Created(res, post);





    })

