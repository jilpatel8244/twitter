const express = require("express");
const logger = require("../../logger/logger");
<<<<<<< HEAD
<<<<<<< HEAD
// const { loginHandler } = require('../controller/auth.controller');
// const passport = require('passport');
// require('../middleware/passport');
// const { forgotpassword } = require('../controller/auth.controller');
// const { verify_user_byemail } = require('../controller/verify_user_byemail');
// const { get_registration,get_password } = require('../controller/registration');
// const { resetpassword } = require('../controller/resetpassword');
const {post_registration,get_registration} = require('../controller/registration');
const {getPassword,postPassword} = require('../controller/password');
=======
const { loginHandler, login } = require("../controller/auth.controller");
=======
const express = require('express');
const logger = require('../../logger/logger');
const { loginHandler } = require('../controller/auth.controller');
>>>>>>> f620cfbe5c013aa276d3587050ec9a8830c5f05e
const passport = require('passport');
require('../middleware/passport');
const router = express.Router();

router.get("/", (req, res) => {
    logger.info("information");
    logger.debug("debug");
    logger.warn("warning");
    res.render('pages/demo');
})
const { forgotpassword } = require('../controller/auth.controller');
const { verify_user_byemail } = require('../controller/verify_user_byemail');
const { get_registration,get_password } = require('../controller/registration');
<<<<<<< HEAD
const { resetpassword } = require('../controller/resetpassword');
const { post_registration } = require("../controller/registration");
>>>>>>> development
=======
>>>>>>> f620cfbe5c013aa276d3587050ec9a8830c5f05e

router.get("/", (req, res) => {
  logger.info("information");
  res.render("pages/index");
});

<<<<<<< HEAD
router.get("/registration", get_registration);
=======
router.get("/login", (req, res) => {
  logger.info("in login page");
  res.render("pages/login");
});

>>>>>>> f620cfbe5c013aa276d3587050ec9a8830c5f05e
router.post("/registration", post_registration);
<<<<<<< HEAD
router.get('/password', getPassword);
router.post('/password', postPassword);



=======
router.post("/userExist",USER_NAME_EXIST)
>>>>>>> development
// router.get("/login", (req, res) => {
//   res.render("pages/login");
// });

// router.post('/login', loginHandler);

// router.get('/home', passport.authenticate('jwt', {session: false } ), (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "on home page"
//     })
// });

router.get("/login", login);

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
