const express = require("express");
const { getMessagesPage, storeMessageHandler } = require("../controller/messages.controller");
const { upload } = require("../middleware/multer");
const router = express.Router();

router.get("/", getMessagesPage);
router.post("/storeMessage", upload.single('imgFile'), storeMessageHandler);

module.exports = router;