const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/cars',policies.isAllowed(['admin','employee']),ctrls.CarCtrl.enrollNewCar)


module.exports = router;
