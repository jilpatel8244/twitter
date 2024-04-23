const express = require("express");
const logger = require("../../logger/logger");
const { getAdminLogin } = require("../controller/adminpannel/adminPannelControler");



const router = express.Router();


router.get("/adminlogin", getAdminLogin)





module.exports = router;
