const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");
let router = express.Router();

router.get(
  "/statistics",
  policies.isAllowed(["admin", "employee"]),
  ctrls.AdminCtrl.statistics
);

module.exports = router;
