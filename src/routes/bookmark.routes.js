const express = require("express");
const { getAllBookmarks } = require("../controller/getAllBookmarks.controller");
const router = express.Router();

router.get("/getBookmarksPage", getAllBookmarks);

module.exports = router;