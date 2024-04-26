const express = require("express");
const logger = require("../../logger/logger");
const { getAdminLogin, getUsers, getTweets, manageUserActivation, ristricTweet, getverifypage, getVerifiedRequest, updateverify, getAdminPannel, adminLoginHandler } = require("../controller/adminpannel/adminPannelControler");

const passport = require("passport");
const { permission } = require("../middleware/permission");
require("../middleware/passport");

const router = express.Router();
router.get("/adminlogin", getAdminLogin)
router.post("/adminlogin", adminLoginHandler)
router.post("/getusers", getUsers)
router.post("/getVerifyRequest", getVerifiedRequest);
router.get("/verify", getverifypage);
router.post("/gettweet", getTweets);
router.post("/updateStatusUser", manageUserActivation);
router.post("/ristrictweet", ristricTweet);
router.post("/updateverify", updateverify);
router.use(passport.authenticate('jwt', { session: false, failureRedirect: "/admin/adminlogin" }), permission)

router.get("/adminPannel", getAdminPannel)




module.exports = router;
