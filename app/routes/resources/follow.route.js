const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");
let router = express.Router();

router.post("/follow/:id", ctrls.FollowCtrl.addFollow);
router.get("/follow", ctrls.FollowCtrl.fetchAll);

module.exports = router;
