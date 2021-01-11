const express = require("express");
const ctrls = require("../../controllers");
const policies = require("../../policies");
let router = express.Router();

router.get("/conversations", ctrls.ConversationCtrl.fetchAll);
router.get(
  "/conversations/:id/messages",
  ctrls.ConversationCtrl.fetchMessagesForConversation
);

module.exports = router;
