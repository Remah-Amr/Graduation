const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/charge',policies.isAllowed(['admin','employee']),ctrls.WalletCtrl.chargeWallet)


module.exports = router;
