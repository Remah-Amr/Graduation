const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/owners', policies.isAllowed(['admin', 'employee']), ctrls.OwnerCtrl.enrollNewOwner)
router.get('/owners', policies.isAllowed(['admin', 'employee']), ctrls.OwnerCtrl.fetchAll)
router.get('/owner/cars', policies.isAllowed(['owner']), ctrls.OwnerCtrl.fetchAllCars)
router.get('/owner/car/transactoins/:carId', policies.isAllowed(['owner']), ctrls.OwnerCtrl.fetchAllCarTransactions)
router.get('/owner/all/driver', policies.isAllowed(['owner']), ctrls.OwnerCtrl.fetchAllDriver)
router.get('/owner/driver/journyes/:driverId', policies.isAllowed(['owner']), ctrls.OwnerCtrl.fetchAllDriverJourneys)
router.get('/owner/all/journyes/:carId', policies.isAllowed(['owner']), ctrls.OwnerCtrl.fetchAllJourneys)
router.get('/ownerjourny/transaction/:journyId', policies.isAllowed(['owner']), ctrls.OwnerCtrl.fetchAll)


module.exports = router;
