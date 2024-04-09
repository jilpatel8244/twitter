const express = require('express');
const logger = require('../../logger/logger');
const { forgotpassword } = require('../controller/auth.controller');
const { verify_user_byemail } = require('../controller/verify_user_byemail');
const router = express.Router();

router.get("/", (req, res) => {
    logger.info("information");
    logger.debug("debug");
    logger.warn("warning");
    res.render('pages/index');
})


//roter for the forgot password

router.get("/forgotpassword", forgotpassword)
router.post("/verify_email", verify_user_byemail)
router.post("/resetpasswordl", resetpassword)



module.exports = router;