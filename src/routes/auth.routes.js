const express = require("express");
const router = express.Router();
const logger = require("../../logger/logger");
const passport = require("passport");
require("../middleware/passport");
const homeRoute = require("./home.routes");
const bookmarkRoute = require("./bookmark.routes");
const likeRoute = require("./like.routes");
const messagesRoute = require("./messages.routes");

const exploreroute = require("../routes/explore.routes");
const { get_registration, post_registration } = require("../controller/registration");
const { getPassword, setPassword } = require("../controller/password");
const { login, loginHandler } = require("../controller/auth.controller");
const { resetPassword, set_password, verify } = require("../controller/resetpassword");
const { verify_user_byemail } = require("../controller/verify_user_byemail");
const { getActivecode } = require("../controller/activecode.controler");







router.get("/", (req, res) => {
    res.render("pages/index");
});

router.get("/registration", get_registration);
router.post("/registration", post_registration);
router.get("/createPassword", getPassword);
router.post("/createPassword", setPassword);
router.get("/login", login);
router.post("/login", loginHandler);
router.get("/forgotpassword", verify);
router.post("/verify_email", verify_user_byemail)
router.post("/activeCode", getActivecode)
router.get("/resetPassword", resetPassword)
router.post("/setPassword", set_password)


router.use('/home', homeRoute);
router.use('/bookmark', passport.authenticate('jwt', { session: false }), bookmarkRoute);
router.use('/like', passport.authenticate('jwt', { session: false }), likeRoute);
router.use('/messages', passport.authenticate('jwt', { session: false }), messagesRoute);


module.exports = router;
