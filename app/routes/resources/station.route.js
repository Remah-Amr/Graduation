const express = require("express");
const ctrls = require("../../controllers");

let router = express.Router();

router.post("/station/add", ctrls.StationCtrl.createStation);
router.post("/station/enter", ctrls.StationCtrl.enterStation);
router.post("/station/leave", ctrls.StationCtrl.leaveStation);
router.get("/station/current/car", ctrls.StationCtrl.currentCar);
router.get("/station/:stationId", ctrls.StationCtrl.fetchAllStation);
router.get("/station/:from/:to", ctrls.StationCtrl.fetchAllGover);
// router.get("/station/:from/:to", ctrls.StationCtrl.fetchAllGover);

module.exports = router;
