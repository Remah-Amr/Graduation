const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/drivers',policies.isAllowed(['admin','employee']),ctrls.DriverCtrl.enrollNewDriver)


module.exports = router;
