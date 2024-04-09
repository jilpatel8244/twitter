const express = require('express');
const logger = require('../../logger/logger');
const { loginHandler } = require('../controller/auth.controller');
const passport = require('passport');
require('../middleware/passport');
const router = express.Router();

router.post('/login', loginHandler);

router.get('/home', passport.authenticate('jwt', {session: false } ), (req, res) => {
    res.status(200).json({
        success: true,
        message: "on home page"
    })
})

module.exports = router;