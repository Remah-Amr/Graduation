const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/centers',policies.isAllowed(['admin','employee']),ctrls.CenterCtrl.enrollNewCenter)
router.get('/centers',policies.isAllowed('admin'),ctrls.CenterCtrl.fetchAll)

module.exports = router;
