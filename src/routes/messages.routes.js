const express = require("express");
const { getMessagesPage, storeMessageHandler } = require("../controller/messages.controller");
const { upload } = require("../middleware/multer");
const passport = require("passport");
require("../middleware/permission");
const router = express.Router();

router.get("/messages", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getMessagesPage);
router.post("/messages/storeMessage", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), upload.single('imgFile'), storeMessageHandler);

module.exports = router;