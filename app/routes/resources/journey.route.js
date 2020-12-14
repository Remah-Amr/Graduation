const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')
let router = express.Router();

router.post('/journey/start',policies.isAllowed(['owner','driver']),ctrls.JourneyCtrl.startJourney)
router.post('/journey/end',policies.isAllowed(['owner','driver']),ctrls.JourneyCtrl.endJourney)


module.exports = router;
