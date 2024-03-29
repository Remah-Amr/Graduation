const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/employees',policies.isAllowed(['admin']),ctrls.EmployeeCtrl.enrollNewEmp)
router.get('/employees',policies.isAllowed(['admin']),ctrls.EmployeeCtrl.fetchAll)


module.exports = router;
