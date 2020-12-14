const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/owners',policies.isAllowed(['admin','employee']),ctrls.OwnerCtrl.enrollNewOwner)


module.exports = router;
