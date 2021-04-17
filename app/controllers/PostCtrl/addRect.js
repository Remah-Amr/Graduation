// let routePath = req.route.path.split("/");
//   let query = {
//     ...(routePath[1] === "requester" && {
//       requester: req.me.id,
//       status: "accepted",
//     }),


const $baseCtrl = require("../$baseCtrl");
const models = require("../../models");
const { APIResponse } = require("../../utils");
const cloudinaryStorage = require("../../services/cloudinaryStorage");

module.exports = $baseCtrl(
    async (req, res) => {
        const user = req.me
        const id = parseInt(req.params.postId);
        if (isNaN(id)) return APIResponse.NotFound(res);
        console.log(id)

        const post = await models.post.findById(id);
        if (!post) return APIResponse.NotFound(res, 'post not found');
        for (let i = 0; i < post.reactions.length; i++) {
            if (post.reactions[i].user === user.id) {// if user alredy maked reaction we update it 
                console.log()
                post.reactions[i].flavor = req.body.flavor
                await post.save()
                return APIResponse.Created(res, post);
            }
        }
        let createdReaction = {
            user: user.id,
            flavor: req.body.flavor,
        }
        post.reactions.push(createdReaction)
        await post.save()

        return APIResponse.Created(res, post);





    })

