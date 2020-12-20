const express = require("express");
const ctrls = require("../../controllers");
const policies = require('../../policies')

let router = express.Router();

router.post("/drivers/:id/rate", ctrls.RateCtrl.createOne);
router.get("/cars/:id/rate",ctrls.RateCtrl.fetchAllPagination);

module.exports = router;
