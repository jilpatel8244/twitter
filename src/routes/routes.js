const express = require("express");
const router = express.Router();
const passport = require("passport");
const { uploadcsv, upload } = require("../middleware/multer");
const { tweetCreate, insertTweet, showDrafts, tweetUpdate, displayImage, deleteDraft, getProfileImage, checkRetweet } = require('../controller/tweet.controller');

const { getExplorePage, getTopTweetAndHastag, getHastag, getMedia, getLatestTweet, getUsername, getUsernameOrHastagOnchage, getverifyuser } = require("../controller/exploreControler/getexplore");
const { get_registration, post_registration, USER_NAME_EXIST } = require("../controller/registration");
const { getPassword, setPassword } = require("../controller/password");
const { login, loginHandler, logoutHandler } = require("../controller/auth.controller");
const { resetPassword, set_password, verify } = require("../controller/resetpassword");
const { verify_user_byemail } = require("../controller/verify_user_byemail");
const { getActivecode } = require("../controller/activecode.controler");
const { getFollowData } = require("../controller/getFollowuser.controller");
const { getFollowingData } = require("../controller/getFollowinguser.controller");
const { getEditprofile, postUpdateProfile } = require("../controller/editprofile.controller");
const { followUnfollowHandler } = require("../controller/getFollow.controller");

const { getReplies } = require("../controller/profile/profile.reply.controller");
const { getPosts } = require("../controller/profile/profile.post.controller");
const { getFollower } = require("../controller/follow.controller");
const { getLikes } = require("../controller/profile/profile.like.controller");
const { getProfile } = require("../controller/profile/profile.controller");
const { getProfileMedia } = require("../controller/profile/profile.media.controller");

const {
  reset_password, resetpasswordget,

} = require("../controller/profile.resetpassword.controller");


const { permission } = require("../middleware/permission");
const logger = require("../../logger/logger");
const { getAdminLogin, getUsers, getTweets, manageUserActivation, ristricTweet, getverifypage, getVerifiedRequest, updateverify, getAdminPannel, adminLoginHandler, addUserCsv, adduserbyform, supportForm, getsupport, oldchats, savechat, useridTickit, admingetsupport, adminid } = require("../controller/adminpannel/adminPannelControler");





const { getAllFollowersList } = require("../controller/getAllFollowersList.controller");
const { get_comment, post_comment, delete_post, delete_comment, edit_comment, get_notification, post_notification, getHomeForyou,
  getHomeFollowing, post_reply, get_reply, delete_reply, edit_reply } = require('../controller/home.controller');


const { retweet, retweetData } = require('../controller/retweet.controller');
const { shareTweetHandler } = require("../controller/sharePostHandler.controller");
const { getMessagesPage, storeMessageHandler } = require("../controller/messages.controller");
const { likeUnlikeHandler } = require("../controller/likeUnlikeHandler");
const { getAllBookmarks } = require("../controller/getAllBookmarks.controller");
const { bookmarkUnbookmarkHandler } = require("../controller/bookmarkUnbookmarkHandler.controller");
const { removeAllBookmarkHandler } = require("../controller/removeAllBookmarksHandler.controller");

const { getAllTrendingHashtagsHandler } = require("../controller/getAllTrendingHashtags.controller");

const { notification, getNotifications, } = require("../controller/notification.controller");
const { getAllSuggestionsAboutWhoToFollowHandler } = require("../controller/getAllSuggestionsAboutWhoToFollowHandler.controller");
const { validateExtensionChange } = require("../middleware/changeExtensionValidation");
/////////////////////



///////////////////////
/////added router 

router.get("/registration", get_registration);
router.post("/registration", post_registration);
router.get("/createPassword", getPassword);
router.post("/createPassword", setPassword);
router.get("/login", login);
router.post("/login", loginHandler);
router.get("/forgotpassword", verify);
router.post("/verify_email", verify_user_byemail)
router.post("/activeCode", getActivecode)
router.get("/resetPassword", resetPassword)
router.post("/setPassword", set_password);
router.get("/logout", logoutHandler);
router.post("/isUserExist", USER_NAME_EXIST);
router.get("/follow", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getFollowData)
router.get("/followingUser", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getFollowingData)
router.get("/editprofile", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getEditprofile);
router.post("/editprofile/updateProfile", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), upload.fields([{ name: "coverPhoto", maxCount: 1 }, { name: "displayPhoto", maxCount: 1 }]), postUpdateProfile);



/////
router.get("/", (req, res) => {
  res.render("pages/index");
});


router.get("/home", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), permission, (req, res) => {
  res.render('pages/home', { user: req.user[0][0] });
});
router.get("/getHomeForyou", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHomeForyou);
router.get("/getHomeFollowing", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHomeFollowing)
router.post('/home/posts/:id', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), delete_post)



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
router.get("/messages", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), permission, getMessagesPage);
router.post("/messages/storeMessage", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), upload.single('imgFile'), storeMessageHandler);

// like routes
router.post('/like', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), likeUnlikeHandler);

// bookmark routes
router.get('/bookmark', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), permission, (req, res) => {
  res.render('pages/bookmark.ejs', { user: req.user[0][0] });
})
router.get('/getAllBookmarks', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllBookmarks);
router.post('/bookmark', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), bookmarkUnbookmarkHandler);

router.post('/removeAllBookmarks', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), removeAllBookmarkHandler);

router.get('/aside/getAllTrendingHashtags', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllTrendingHashtagsHandler);

router.post('/aside/getAllSuggestionsAboutWhoToFollow', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getAllSuggestionsAboutWhoToFollowHandler);

// end of jil patel routes


//rajnikumar-tweetGenerate component

router.get('/tweetPost', passport.authenticate('jwt', { session: false }), tweetCreate);

router.post('/tweetPost/insertTweet', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), upload.array('media', 1), insertTweet);
router.get('/tweetPost/displayDrafts', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), showDrafts);
router.post('/tweetPost/tweetUpdate', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), upload.single('media'), validateExtensionChange, tweetUpdate);
router.get('/tweetPost/displayImage', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), displayImage)
router.post('/tweetPost/draftDelete', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), deleteDraft);
router.get('/tweetPost/profileImage', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getProfileImage);

router.post('/checkRetweet', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), checkRetweet);



//mihir routers  for admin pannel


router.post("/admin/uploadcsv", uploadcsv.single("file"), addUserCsv)
router.post("/admin/supportform", upload.single("media"), passport.authenticate('jwt', { session: false, failureRedirect: "/admin/adminlogin" }), supportForm)
router.get("/admin/adminlogin", getAdminLogin)
router.post("/admin/oldchats", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), oldchats)
router.post("/admin/savechat", savechat)
router.post("/admin/adminlogin", adminLoginHandler)
router.post("/admin/getusers", getUsers)
router.post("/admin/getVerifyRequest", getVerifiedRequest);
router.get("/admin/verify", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), permission, getverifypage);
router.post("/admin/gettweet", getTweets);
router.post("/admin/updateStatusUser", manageUserActivation);
router.post("/admin/ristrictweet", ristricTweet);
router.post("/admin/updateverify", updateverify);
router.post("/admin/adduser", adduserbyform);
router.get("/admin/getsupport", passport.authenticate('jwt', { session: false, failureRedirect: "/admin/adminlogin" }), getsupport)
router.get("/admin/adminsupport", passport.authenticate('jwt', { session: false, failureRedirect: "/admin/adminlogin" }), admingetsupport)
router.post("/admin/useridTickit", passport.authenticate('jwt', { session: false, failureRedirect: "/admin/adminlogin" }), useridTickit)
router.get("/admin/adminid", passport.authenticate('jwt', { session: false, failureRedirect: "/admin/adminlogin" }), adminid)
router.get("/admin/adminPannel", passport.authenticate('jwt', { session: false, failureRedirect: "/admin/adminlogin" }), permission, getAdminPannel)



//mihir routes for explore module 
router.get("/explore", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), permission, getExplorePage)
router.post("/explore/topTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getTopTweetAndHastag)
router.post("/explore/latestTweet", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getLatestTweet)
router.post("/explore/username", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getUsername)
router.post("/explore/getMedia", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getMedia)
router.post("/explore/hastag", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getHastag);
router.post("/explore/searchboxdata", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getUsernameOrHastagOnchage);
router.get("/explore/profile", passport.authenticate('jwt', { session: false }), getProfile);
router.get("/explore/profile/reply", getReplies);
router.get('/explore/profile/post', getPosts);
router.get('/explore/profile/like', getLikes);
router.get('/explore/profile/media', getProfileMedia);



// Sanket Patel Profile Routes Starts Here

router.get("/profile", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), permission, getProfile);
router.get("/profile/post", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getPosts);
router.get("/profile/reply", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getReplies);
router.get("/profile/like", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getLikes);
router.get("/profile/media", passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), getProfileMedia);

// Sanket Patel Profile Routes Ends Here

module.exports = router


// parmeshvar parmar routes

// notification routes

router.get("/notifications", passport.authenticate("jwt", { session: false, failureRedirect: "/login" }), notification);

router.get("/notification", passport.authenticate("jwt", { session: false, failureRedirect: "/login" }), getNotifications);





////
router.get(
  "/profilepasswordreset",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  resetpasswordget
);

router.post(
  "/profilepasswordreset",
  passport.authenticate("jwt", { session: false, failureRedirect: "/login" }),
  reset_password
);


router.post("/follow", passport.authenticate("jwt", { session: false, failureRedirect: "/login" }), followUnfollowHandler)









//new route by mihir  date 2 may 

router.get("/verify/get", passport.authenticate("jwt", { session: false, failureRedirect: "/login" }), getverifyuser)
