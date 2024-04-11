const express = require("express");
const logger = require("../../logger/logger");

const { loginHandler, login } = require("../controller/auth.controller");
// const passport = require('passport');
// require('../middleware/passport');
// const { forgotpassword } = require('../controller/auth.controller');
// const { verify_user_byemail } = require('../controller/verify_user_byemail');
// const { get_registration,get_password } = require('../controller/registration');
// const { resetpassword } = require('../controller/resetpassword');
// const { post_registration, get_registration } = require('../controller/registration');
// const { getPassword, postPassword } = require('../controller/password');
// const passport = require('passport');
// require('../middleware/passport');
const router = express.Router();
// const get_editprofile = require('../routes/editprofile.route')
// router.get("/editprofile", get_editprofile);
const {get_editprofile} = require('../controller/editprofile.controller');
router.get("/editprofile", get_editprofile);
// router.get("/", (req, res) => {
//     logger.info("information");
//     logger.debug("debug");
//     logger.warn("warning");
//     res.render('pages/demo');
// })
// const { forgotpassword } = require('../controller/auth.controller');
// const { verify_user_byemail } = require('../controller/verify_user_byemail');
// const { get_password } = require('../controller/registration');



const exploreroute = require("../routes/explore.routes")

const post = require('./post.routes.js');

router.use('/tweetPost',post)

// router.get("/", (req, res) => {
//     logger.info("information");
//     logger.debug("debug");
//     logger.warn("warning");
//     res.render('pages/demo');
// })
// const { forgotpassword } = require('../controller/auth.controller');
// const { verify_user_byemail } = require('../controller/verify_user_byemail');
// const { get_registration,get_password } = require('../controller/registration');


//change by mihir date : 11 - 04 
router.use("/explore", exploreroute)

// router.get("/", (req, res) => {
//   logger.info("information");
//   logger.debug("debug");
//   logger.warn("warning");
//   res.render('pages/demo');
// })
// const { forgotpassword } = require('../controller/auth.controller');
// const { verify_user_byemail } = require('../controller/verify_user_byemail');
// const { get_registration, get_password } = require('../controller/registration');

// const { resetpassword } = require('../controller/resetpassword');
// const { post_registration } = require("../controller/registration");

// const { post_registration } = require('../controller/registration');


// const { resetpassword } = require('../controller/resetpassword');
// const { post_registration } = require("../controller/registration");

// const { resetpassword } = require('../controller/resetpassword');




// const { resetpassword } = require("../controller/resetpassword");

// router.get("/", (req, res) => {
//   logger.info("information");
//   res.render("pages/index");
// });

// router.get("/registration", get_registration);
// router.get("/login", (req, res) => {
//   logger.info("in login page");
//   res.render("pages/login");
// });


// router.post("/registration", post_registration);

// router.get('/password', getPassword);
// router.post('/password', postPassword);

// router.post("/registration", post_registration);

router.get("/password", getPassword);
router.post("/password", postPassword);

// router.post('/login', loginHandler);

// router.get('/home', passport.authenticate('jwt', {session: false } ), (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "on home page"
//     })
// });


// router.get("/login", login);

// router.post('/login', loginHandler);

// router.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "on home page"
//   })
// });

// //roter for the forgot password

// router.get("/forgotpassword", forgotpassword)
// router.post("/verify_email", verify_user_byemail)
// router.post("/resetpasswordl", resetpassword)


// router.get("/registration", get_registration)
// router.get("/password", get_password)

// //roter for the forgot password

// router.get("/forgotpassword", forgotpassword)
// router.post("/verify_email", verify_user_byemail)
// // router.post("/resetpasswordl", resetpassword)


// router.get("/registration", get_registration)
// router.get("/password", get_password)


module.exports = router;
