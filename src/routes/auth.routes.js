const express = require("express");
const router = express.Router();
const logger = require("../../logger/logger");
// const { loginHandler } = require('../controller/auth.controller');
// const passport = require('passport');
// require('../middleware/passport');
// const { forgotpassword } = require('../controller/auth.controller');
// const { verify_user_byemail } = require('../controller/verify_user_byemail');
// const { get_registration,get_password } = require('../controller/registration');
// const { resetpassword } = require('../controller/resetpassword');
const {post_registration,get_registration} = require('../controller/registration');
const {getPassword,postPassword} = require('../controller/password');

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/registration", get_registration);
router.post("/registration", post_registration);
router.get('/password', getPassword);
router.post('/password', postPassword);



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




// //roter for the forgot password

// router.get("/forgotpassword", forgotpassword)
// router.post("/verify_email", verify_user_byemail)
// router.post("/resetpasswordl", resetpassword)


// router.get("/password", get_password)

module.exports = router;
