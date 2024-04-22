const express = require("express");
const { likeUnlikeHandler } = require("../controller/likeUnlikeHandler");
const router = express.Router();
const passport = require("passport");
require("../middleware/passport");

router.post('/like', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), likeUnlikeHandler);

module.exports = router;