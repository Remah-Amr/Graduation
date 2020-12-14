const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/check-car',ctrls.TransactionCtrl.checkCarByCode)
router.post('/payment',ctrls.TransactionCtrl.payment)


module.exports = router;
