const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')

let router = express.Router();

router.post("/friend/trastable", ctrls.TrastableCtrl.addTrastable);
// router.get("/allTrast", ctrls.TrastableCtrl.fetchAll);
router.get("/my/trastable", ctrls.TrastableCtrl.fetchAllTrastable);
router.get("/my/trastable/request", ctrls.TrastableCtrl.fetchAllTrastReq);
router.put("/my/trastable/:trastId", ctrls.TrastableCtrl.updateTrastableStatus);
router.put("/my/trastable/remove/:trastId", ctrls.TrastableCtrl.removeTrastable);
// router.get("/cars/:id/rate", ctrls.TrastableCtrl.fetchAllPagination);

module.exports = router;
