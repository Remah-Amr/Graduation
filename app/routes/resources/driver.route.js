const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/drivers',policies.isAllowed(['admin','employee']),ctrls.DriverCtrl.enrollNewDriver)
router.get('/drivers',policies.isAllowed(['admin','employee']),ctrls.DriverCtrl.fetchAll)


module.exports = router;
