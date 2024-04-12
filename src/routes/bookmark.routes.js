const express = require("express");
const { getAllBookmarks } = require("../controller/getAllBookmarks.controller");
const { bookmarkUnbookmarkHandler } = require("../controller/bookmarkUnbookmarkHandler.controller");
const router = express.Router();

router.get("/", getAllBookmarks);
router.post("/", bookmarkUnbookmarkHandler)

module.exports = router;