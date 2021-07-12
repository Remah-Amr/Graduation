const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/posts', ctrls.PostCtrl.createPost)
router.post('/posts/:postId/comments', ctrls.PostCtrl.createPost)
router.post('/comments/:commentId/replies', ctrls.PostCtrl.createPost)
router.post('/share/:postId/post', ctrls.PostCtrl.sharePost)
router.post('/posts/:postId', ctrls.PostCtrl.addRect)
router.get('/posts/:postId', ctrls.PostCtrl.fetchReacts)


router.get('/fetch/post', ctrls.PostCtrl.fetchAll)
router.get('/fetch/:postId/comments', ctrls.PostCtrl.fetchAll)
router.get('/fetch/:commentId/replies', ctrls.PostCtrl.fetchAll)



router.delete('/post/:postId', ctrls.PostCtrl.deletePost)
router.delete('/react/:postId', ctrls.PostCtrl.removeReact)
router.put('/post/:postId', ctrls.PostCtrl.updatePost)


module.exports = router;
