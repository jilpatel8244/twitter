const express = require("express");
const logger = require("../../logger/logger");

// const { loginHandler } = require('../controller/auth.controller');
// const passport = require('passport');
// require('../middleware/passport');
// const { forgotpassword } = require('../controller/auth.controller');
// const { verify_user_byemail } = require('../controller/verify_user_byemail');
// const { get_registration,get_password } = require('../controller/registration');
// const { resetpassword } = require('../controller/resetpassword');
// const {get_registration} = require('../controller/registration');
// const {getPassword,postPassword} = require('../controller/password');
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

<<<<<<< HEAD
// const { resetpassword } = require('../controller/resetpassword');


=======
router.get("/", (req, res) => {
    logger.info("information");
    logger.debug("debug");
    logger.warn("warning");
    res.render('pages/demo');
})
>>>>>>> development

// router.get("/", (req, res) => {
//   logger.info("information");
//   res.render("pages/index");
// });

// router.get("/registration", get_registration);
// router.get("/login", (req, res) => {
//   logger.info("in login page");
//   res.render("pages/login");
// });

<<<<<<< HEAD
// router.post("/registration", post_registration);

// router.get('/password', getPassword);
// router.post('/password', postPassword);



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


// router.get("/login", login);

// router.post('/login', loginHandler);

// router.get('/home', passport.authenticate('jwt', {session: false } ), (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "on home page"
//     })
// });
=======
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
>>>>>>> development

// //roter for the forgot password

<<<<<<< HEAD
// router.get("/forgotpassword", forgotpassword)
// router.post("/verify_email", verify_user_byemail)
// // router.post("/resetpasswordl", resetpassword)


// router.get("/registration", get_registration)
// router.get("/password", get_password)
=======
router.get("/forgotpassword", forgotpassword)
router.post("/verify_email", verify_user_byemail)
// router.post("/resetpasswordl", resetpassword)


router.get("/registration", get_registration)
>>>>>>> development

module.exports = router;
