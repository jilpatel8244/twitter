// starting of jil patel routes

// share routes
router.get("/getAllFollowersList", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllFollowersList);
router.post("/shareTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), shareTweetHandler);

// message routes
router.get("/messages", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getMessagesPage);
router.post("/messages/storeMessage", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), upload.single('imgFile'), storeMessageHandler);

// like routes
router.post('/like', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), likeUnlikeHandler);

// bookmark routes
router.get('/bookmark', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), (req, res) => {
    res.render('pages/bookmark.ejs', { user: req.user[0][0] });
})
router.get('/getAllBookmarks', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllBookmarks);
router.post('/bookmark', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), bookmarkUnbookmarkHandler);

router.post('/removeAllBookmarks', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), removeAllBookmarkHandler);


// end of jil patel routes



const logger = require("../../logger/logger");
const express = require('express');
const router = express.Router();
const passport = require("passport");

//rajnikumar-tweetGenerate component
const { upload } = require("../middleware/multer");
const {tweetCreate,insertTweet, showDrafts, tweetUpdate, displayImage, deleteDraft,getProfileImage, checkRetweet} = require('../controller/tweet.controller');
router.get('/tweetPost',passport.authenticate('jwt',{session:false}),tweetCreate);

router.post('/tweetPost/insertTweet',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),upload.array('media',1),insertTweet);
router.get('/tweetPost/displayDrafts',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),showDrafts);
router.post('/tweetPost/tweetUpdate',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),upload.single('media'),tweetUpdate);
router.get('/tweetPost/displayImage',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),displayImage)
router.post('/tweetPost/draftDelete',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),deleteDraft);
router.get('/tweetPost/profileImage',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),getProfileImage);

router.post('/checkRetweet',passport.authenticate('jwt',{session:false,failureRedirect: "/login" }),checkRetweet);

module.exports = router
