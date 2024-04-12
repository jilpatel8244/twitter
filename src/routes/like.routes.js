const express = require("express");
const { likeUnlikeHandler } = require("../controller/likeUnlikeHandler");
const router = express.Router();

router.post("/", likeUnlikeHandler);

module.exports = router;