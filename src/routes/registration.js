const express = require('express');
const {get_registration,post_registration} = require('../controller/registration');
const registration_router = express.Router();

registration_router.route("/registration").get(get_registration).post(post_registration);

module.exports = registration_router;