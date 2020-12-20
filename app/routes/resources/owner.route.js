const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/owners', policies.isAllowed(['admin', 'employee']), ctrls.OwnerCtrl.enrollNewOwner)
router.get('/owners', policies.isAllowed(['admin', 'employee']), ctrls.OwnerCtrl.fetchAll)
router.get('/owner/all/driver', policies.isAllowed(['owner']), ctrls.OwnerCtrl.fetchAllDriver)
router.get('/owner/car/transactoins/:carId', ctrls.OwnerCtrl.fetchAllCarTransactions)


module.exports = router;
