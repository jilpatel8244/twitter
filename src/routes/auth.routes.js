const express = require("express");
const router = express.Router();
const logger = require("../../logger/logger");
const passport = require("passport");
require("../middleware/passport");
const bookmarkRoute = require("./bookmark.routes");
const { get_editprofile, post_updateProfile } = require("../controller/editprofile.controller");
const exploreroute = require("../routes/explore.routes");
// const post = require("./post.routes.js");
const { get_registration, post_registration } = require('../controller/registration');
const { getPassword, postPassword } = require("../controller/password");
const { forgotpassword } = require("../controller/auth.controller");
const { resetpassword } = require("../controller/resetpassword");
const { verify_user_byemail } = require("../controller/verify_user_byemail");
const { login, loginHandler } = require("../controller/auth.controller");

// router.get("/", (req, res) => {
//     logger.info("information");
//     res.render("pages/index");
// });

// const get_editprofile = require('../routes/editprofile.route')
// router.get("/editprofile", get_editprofile);

router.get("/login", login);
router.post("/login", loginHandler);

router.get("/password", getPassword);
router.post("/password", postPassword);

// router.get("/registration", get_registration);
// router.post("/registration", post_registration);

// router.get('/password', getPassword);
// router.post('/password', postPassword);

// router.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "on home page"
//     })
// });

router.get("/forgotpassword", forgotpassword);
router.post("/verify_email", verify_user_byemail);
// router.post("/resetpasswordl", resetpassword);

router.get("/registration", get_registration);
router.post("/registration", post_registration);
router.get('/password', getPassword);
router.post('/password', postPassword);

router.get("/editprofile", get_editprofile);
// router.use('/tweetPost', post)
router.use("/explore", exploreroute)

router.use('/bookmark', passport.authenticate('jwt', { session: false }), bookmarkRoute);
// router.use('/like', passport.authenticate('jwt', { session: false }), likeRoute);


module.exports = router;
