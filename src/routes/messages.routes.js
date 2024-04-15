const express = require("express");
const { getMessagesPage, storeMessageHandler } = require("../controller/messages.controller");
const router = express.Router();

router.get("/", getMessagesPage);
router.post("/storeMessage", storeMessageHandler);

module.exports = router;