const express = require("express");
const logger = require("../../logger/logger");
const { getAdminLogin, getUsers, getTweets } = require("../controller/adminpannel/adminPannelControler");



const router = express.Router();


router.get("/adminlogin", getAdminLogin)


router.get("/getusers", getUsers)




router.get("/gettweet", getTweets);







module.exports = router;
