const express = require("express");
const ctrls = require("../../controllers");
let router = express.Router();

router.post('/check-car', ctrls.TransactionCtrl.checkCarByCode)
router.post('/payment', ctrls.TransactionCtrl.payment)
router.post('/withdraw', ctrls.TransactionCtrl.withdraw)
router.post('/balance/transfer', ctrls.TransactionCtrl.balanceTransfer)


module.exports = router;
