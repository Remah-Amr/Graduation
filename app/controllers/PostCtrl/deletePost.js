const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    async (req, res) => {
        const user = req.me
        // fetch type of deletion

        const id = parseInt(req.params.postId);
        if (isNaN(id)) return APIResponse.NotFound(res);
        console.log(id)
        const post = await models.post.findById(id);
        if (!post) return APIResponse.NotFound(res, 'post not found');
        if (post.author !== user.id) return APIResponse.Forbidden(res);


        if (post.depth === 0) {//post
            await post.delete()
            await models.post.deleteMany({ parents: post.id })
        }

        if (post.depth === 1) {//comment
            // delete comment
            await post.delete()
            // delete replies 
            let replies = await models.post.find({ directParent: post.id })//reply
            replies = replies.map(reply => reply.id)
            // pull it form  array of post comments 
            await models.post.updateOne({ _id: post.directParent },
                { $pull: { comments: { $in: [post.id, ...replies] } } })//comment
            await models.post.deleteMany({ directParent: post.id })//delete replies

        }

        if (post.depth === 2) {//reply
            // delete reply 
            await post.delete()
            await models.post.updateMany({ _id: { $in: post.parents } }, { $pull: { comments: post.id } })


        }

        return APIResponse.Created(res, 'post is deleted ');
    })

