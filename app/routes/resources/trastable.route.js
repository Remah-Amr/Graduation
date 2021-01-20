const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

let router = express.Router();

router.post("/trustable-request", ctrls.TrastableCtrl.addTrastable);

router.patch("/trustable-request/:id", ctrls.TrastableCtrl.updateStatus);

router.get(
  "/requester/trustable-requests",
  ctrls.TrastableCtrl.fetchTrustableUsers
);

router.get(
  "/recipient/trustable-requests",
  ctrls.TrastableCtrl.fetchTrustableUsers
);

module.exports = router;
