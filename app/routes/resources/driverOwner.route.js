const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.get('/my-cars',policies.isAllowed(['driver','owner']),ctrls.DriverOwnerCtrl.fetchMyCars)
router.post('/cars/start',policies.isAllowed(['driver','owner']),ctrls.DriverOwnerCtrl.enterCodeToStart)
router.post('/my-cars/:id/start',policies.isAllowed(['driver','owner']),ctrls.DriverOwnerCtrl.selectCarToStart)


module.exports = router;
