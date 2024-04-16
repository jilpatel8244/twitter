const express = require("express");
const { likeUnlikeHandler } = require("../controller/likeUnlikeHandler");
const router = express.Router();
// const passport = require("passport");
// require("../middleware/passport");

router.post("/", likeUnlikeHandler);

module.exports = router;