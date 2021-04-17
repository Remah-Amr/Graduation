const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    [{ name: "photo", maxCount: 10 }], cloudinaryStorage,
    async (req, res) => {


        const user = req.me
        // find post want to share  
        let post = await models.post.findById(req.params.postId)
        if (!post) {
            return APIResponse.NotFound(res, 'noooooooo');

        }
        let photos = []
        if (req.files && req.files["photo"]) {
            for (let i = 0; i < req.files["photo"].length; i++) {
                photos.push(req.files['photo'][i].secure_url)
            }
        }
        let createdPost = await models.post({

            depth: 0,
            author: user.id,
            images: photos,
            content: req.body.content,
            reactions: [],
            comments: [],
            isShared: true,
            sharedPost: post.id//old post 
        }).save();

        return APIResponse.Created(res, createdPost);








    })

