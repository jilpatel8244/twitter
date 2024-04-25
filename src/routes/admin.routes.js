const express = require("express");
const logger = require("../../logger/logger");
const { getAdminLogin, getUsers, getTweets, manageUserActivation, ristricTweet, getverifypage, getVerifiedRequest, updateverify, getAdminPannel, adminLoginHandler } = require("../controller/adminpannel/adminPannelControler");

const passport = require("passport");
require("../middleware/passport");
const router = express.Router();


router.get("/adminlogin", getAdminLogin)
router.post("/adminlogin", adminLoginHandler)
router.get("/adminPannel", passport.authenticate('jwt', { session: false, failureRedirect: "/admin/adminlogin" }), getAdminPannel)
router.get("/getusers", getUsers)
router.get("/getVerifyRequest", getVerifiedRequest);
router.get("/verify", getverifypage);
router.get("/gettweet", getTweets);
router.post("/updateStatusUser", manageUserActivation);
router.post("/ristrictweet", ristricTweet);
router.post("/updateverify", updateverify);






module.exports = router;
