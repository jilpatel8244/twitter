const express = require("express");
const logger = require("../../logger/logger");
const express = require('express');
const logger = require('../../logger/logger');
const { loginHandler } = require('../controller/auth.controller');
const passport = require('passport');
require('../middleware/passport');
const router = express.Router();
const {SET_USER_NAME_PAGE} = require('../controller/auth.controller')

router.get("/", (req, res) => {
    logger.info("information");
    logger.debug("debug");
    logger.warn("warning");
    res.render('pages/demo');
})
router.get("/setUserName",SET_USER_NAME_PAGE)
const { forgotpassword } = require('../controller/auth.controller');
const { verify_user_byemail } = require('../controller/verify_user_byemail');
const { get_registration,get_password } = require('../controller/registration');

router.get("/", (req, res) => {
  logger.info("information");
  res.render("pages/index");
});

router.get("/login", (req, res) => {
  logger.info("in login page");
  res.render("pages/login");
});


router.post('/login', loginHandler);

router.get('/home', passport.authenticate('jwt', {session: false } ), (req, res) => {
    res.status(200).json({
        success: true,
        message: "on home page"
    })
});




//roter for the forgot password

router.get("/forgotpassword", forgotpassword)
router.post("/verify_email", verify_user_byemail)
router.post("/resetpasswordl", resetpassword)


router.get("/registration", get_registration)
router.get("/password", get_password)

module.exports = router;
