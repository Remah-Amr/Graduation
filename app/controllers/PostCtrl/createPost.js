const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 10 }], cloudinaryStorage,
    async (req, res) => {
        // await models.post.deleteMany()
        const user = req.me
        // fetch type of creation 
        let type = req.params.postId ? 'comment' : req.params.commentId ? 'reply' : 'post'
        let idFetch = type === 'comment' ? req.params.postId : type === 'reply' ? req.params.commentId : null
        let post = await models.post.findById(idFetch)
        if (!post) return APIResponse.NotFound(res);
        let photos = []
        if (req.files && req.files["photo"]) {
            for (let i = 0; i < req.files["photo"].length; i++) {
                photos.push(req.files['photo'][i].secure_url)
            }
        }
        let createdPost = await models.post({
            depth: type === 'post' ? 0 : post.depth + 1,
            directParent: type === 'post' ? null : post.id,
            parents: [
                ...(type !== 'post' ? [post.id] : []),// direct parent 
                ...(type === 'reply' ? post.parents : []),
            ],
            author: user.id,
            images: photos,
            content: !req.body.content ? null : req.body.content,
            reactions: [],
        })
            .save();


        if (type === 'comment') {
            post.comments.push(createdPost.id)
            await post.save()
        }
        if (type === 'reply') {
            let parent = await models.post.findById(post.directParent) //big post 
            parent.comments.push(createdPost.id)
            await parent.save()
            post.comments.push(createdPost.id)
            await post.save()
        }
        return APIResponse.Created(res, createdPost);





    })

