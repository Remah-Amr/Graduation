const express = require("express");
const ctrls = require("../../controllers");

let router = express.Router();

router.post("/tracking", ctrls.TrackingCtrl.addLastSeen);
router.get("/tracking/:id", ctrls.TrackingCtrl.fetchLastSeen);

module.exports = router;
