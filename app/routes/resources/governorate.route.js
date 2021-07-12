const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");
let router = express.Router();

router.get("/governorates", ctrls.GovernorateCtrl.fetchAll);
router.post(
  "/governorate/addNew",
  policies.isAllowed(["admin", "employee"]),
  ctrls.GovernorateCtrl.addNew
);

// router.post('/my-cars/:id/start', policies.isAllowed(['driver', 'owner']), ctrls.DriverOwnerCtrl.selectCarToStart)
// apiRouter.post("/governorate/addNew", ctrls.GovernorateCtrl.addNew);

module.exports = router;
