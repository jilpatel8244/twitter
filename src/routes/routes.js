const express = require("express");
const router = express.Router();
const passport = require("passport");
const { get_comment, post_comment,delete_post, delete_comment, edit_comment, get_notification, post_notification, getHomeForyou,
  getHomeFollowing, post_reply, get_reply, delete_reply, edit_reply } = require('../controller/home.controller');


const { retweet, retweetData } = require('../controller/retweet.controller');

router.get("/", (req, res) => {
  res.render("pages/index");
});


router.get("/home", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), (req, res) => {
  res.render('pages/home', { user: req.user[0][0] });
});
router.get("/getHomeForyou", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHomeForyou);
router.get("/getHomeFollowing", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHomeFollowing)
router.post('/home/posts/:id',passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), delete_post)



router.get("/get_notification", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), get_notification)
router.post("/post_notification", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), post_notification)

// router.post("/home", getHome);
router.get('/get_comments/:id', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), get_comment);
router.post('/post_comments', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), post_comment);
router.post('/delete_comment/:id', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), delete_comment);
router.post('/edit_comment/:id', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), edit_comment);
router.post('/post_reply', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), post_reply);
router.post('/get_reply', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), get_reply);
router.post('/delete_reply/:id', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), delete_reply);
router.post('/edit_reply/:id', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), edit_reply);

router.post("/retweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), retweet)

router.post("/retweetData", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), retweetData)




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
