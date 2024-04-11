const express = require("express");
const logger = require("../../logger/logger");
const router = express.Router();
const {get_editprofile} = require('../controller/editprofile.controller');
router.get("/", get_editprofile);
module.exports = router;
