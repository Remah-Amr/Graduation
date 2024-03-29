const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");

let router = express.Router();

router.post(
  "/station/add",
  policies.isAllowed(["admin", "employee"]),
  ctrls.StationCtrl.createStation
);
router.post("/station/enter", ctrls.StationCtrl.enterStation);
router.post("/station/leave", ctrls.StationCtrl.leaveStation);
router.post("/station/current/car", ctrls.StationCtrl.currentCar);
router.get("/station/:stationId", ctrls.StationCtrl.fetchAllStation);
router.patch(
  "/station/:id",
  policies.isAllowed(["admin", "employee"]),
  ctrls.StationCtrl.updateOne
);
router.delete(
  "/station/:id",
  policies.isAllowed(["admin", "employee"]),
  ctrls.StationCtrl.deleteOne
);
router.get("/stations", ctrls.StationCtrl.fetchAll);
router.get("/station/car/:carId", ctrls.StationCtrl.fetchSingleCar);
router.get("/station/:from/:to", ctrls.StationCtrl.fetchAllGover);
router.get("/station-inline/:from/:to", ctrls.StationCtrl.fetchCarInLine);
// router.get("/station/:from/:to", ctrls.StationCtrl.fetchAllGover);

module.exports = router;
