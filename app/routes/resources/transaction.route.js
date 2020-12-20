const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/check-car', ctrls.TransactionCtrl.checkCarByCode)
router.post('/payment', ctrls.TransactionCtrl.payment)
router.post('/paymentBus', ctrls.TransactionCtrl.paymentBus)
router.post('/withdraw', ctrls.TransactionCtrl.withdraw)
router.post('/balance/transfer', ctrls.TransactionCtrl.balanceTransfer)


module.exports = router;
