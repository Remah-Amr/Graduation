const express = require("express");
const policies = require("../../policies");
const ctrls = require("../../controllers");

const router = express.Router();

router.post("/notifications", ctrls.NotificationCtrl.sendNotification); // dev
router.get("/notifications", ctrls.NotificationCtrl.fetchAll);
router.post("/notifications/subscribe", ctrls.NotificationCtrl.subscribe);
router.post("/notifications/unsubscribe", ctrls.NotificationCtrl.unsubscribe);
router.get("/notifications/count", ctrls.NotificationCtrl.numberOfUnseen);

module.exports = router;
