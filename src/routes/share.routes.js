const express = require("express");
const passport = require("passport");
const { getAllFollowersList } = require("../controller/getAllFollowersList.controller");
const { shareTweetHandler } = require("../controller/sharePostHandler.controller");
require("../middleware/permission");
const router = express.Router();

router.get("/getAllFollowersList", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllFollowersList);
router.post("/shareTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), shareTweetHandler);


module.exports = router;