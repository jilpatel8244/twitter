const express = require("express");
const logger = require("../../logger/logger");


const {post_registration,get_registration} = require('../controller/registration');
const {getPassword,postPassword} = require('../controller/password');
const { forgotpassword } = require('../controller/auth.controller');
const { verify_user_byemail } = require('../controller/verify_user_byemail');
const { resetpassword } = require('../controller/resetpassword');
const passport = require('passport');

require('../middleware/passport');
const router = express.Router();

router.get("/", (req, res) => {
    logger.info("information");
    logger.debug("debug");
    logger.warn("warning");
    res.render('pages/demo');
})

router.get("/", (req, res) => {
  logger.info("information");
  res.render("pages/index");
});

router.get("/registration", get_registration);
router.get("/login", (req, res) => {
  logger.info("in login page");
  res.render("pages/login");
});

router.post("/registration", post_registration);
// router.get('/password', getPassword);
// router.post('/password', postPassword);

// router.get("/login", login);

// router.post('/login', loginHandler);

router.get('/home', passport.authenticate('jwt', {session: false } ), (req, res) => {
    res.status(200).json({
        success: true,
        message: "on home page"
    })
});

//roter for the forgot password

router.get("/forgotpassword", forgotpassword)
router.post("/verify_email", verify_user_byemail)
// router.post("/resetpasswordl", resetpassword)


router.get("/registration", get_registration)

module.exports = router;
