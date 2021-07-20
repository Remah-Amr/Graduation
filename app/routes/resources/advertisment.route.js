const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");
let router = express.Router();

router.post(
  "/ads",
  policies.isAllowed(["admin", "employee"]),
  ctrls.AdvertismentCtrl.createOne
);
router.put(
  "/ads/:id",
  policies.isAllowed(["admin", "employee"]),
  ctrls.AdvertismentCtrl.updateOne
);
router.delete(
  "/ads/:id",
  policies.isAllowed(["admin", "employee"]),
  ctrls.AdvertismentCtrl.deleteOne
);
router.get("/ads-random", ctrls.AdvertismentCtrl.fetchOne);
router.get("/ads", ctrls.AdvertismentCtrl.fetchAll);

module.exports = router;
