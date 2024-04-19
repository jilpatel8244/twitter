const connection = require('../../config/connection');
const logger = require('../../logger/logger');

exports.getProfile = async (req, res) => {
  try {
    let id = req.user[0][0].id;
    // const { id } = req.query;
    // console.log(id);
    logger.info(id);

    const profileQuery = `SELECT * FROM users WHERE id=?`;
    const [userProfileData] = await connection.query(profileQuery, [id]);
    // console.log(userProfileData);

    if (userProfileData) {

      const postDataQuery = `SELECT * FROM users as u INNER JOIN tweets as t ON u.id=t.user_id WHERE u.id = ?`;
      const [postData] = await connection.query(postDataQuery, [id]);
      console.log(postData[0]);

      if (postData[0]) {

        const profileTweetId = postData[0].id;

        const twitCount = `SELECT count(*) as t FROM tweets WHERE user_id = ?`;
        const [twitCountData] = await connection.query(twitCount, [id]);
        // console.log(twitCountData[0]);

        const commentDataQuery = `SELECT *,tc.created_at as comment_created FROM tweet_comments as tc INNER JOIN users as u ON tc.user_id = u.id WHERE tweet_id= 30`;
        const [commentData] = await connection.query(commentDataQuery, [profileTweetId]);
        // console.log(profileTweetId);
        // console.log(commentData);

        if (commentData[0]) {

          const replyCommentDataQuery = `SELECT * FROM reply_comments WHERE id=?`;
          const [replyCommentData] = await connection.query(replyCommentDataQuery, [id]);
          console.log(replyCommentData);

          if (replyCommentData[0]) {
            // confilict sove karvana che kale 
            let replyData, tweetData;
            let allLikedTweet = [];
            res.render("../views/pages/profile", { userProfileData, replyCommentData, postData, allLikedTweet, twitCountData, replyData, tweetData, commentData });

          } else {

            const replyDataQuery = `SELECT rt.tweet_id,rt.retweet_message,rt.user_id as retweeter, rt.created_at as retweet_date, u.username, u.name ,t.* FROM users as u INNER JOIN retweets as rt INNER JOIN tweets as t ON u.id=rt.user_id AND rt.tweet_id = t.id WHERE u.id =?`;
            let [replyData] = await connection.query(replyDataQuery, [id]) || [[]];

            if (replyData[0]) {
              console.log(replyData);
              let tweetId = replyData[0].tweet_id;
              // console.log(tweetId);
              logger.info(tweetId);
              const tweetDataQuery = `SELECT u.name,u.username,t.id,t.content,t.created_at as tweet_Date FROM tweets as t INNER JOIN users as u ON u.id = t.user_id WHERE t.id=?`;
              let [tweetData] = await connection.query(tweetDataQuery, [tweetId]);
              console.log(tweetData);
              if (commentData[0]) {
                let allLikedTweet = [];
                res.render('../views/pages/profile', { userProfileData, allLikedTweet, postData, twitCountData, replyData, tweetData, commentData });
              } else {
                let commentData;
                let allLikedTweet = [];
                res.render('../views/pages/profile', { userProfileData, allLikedTweet, postData, twitCountData, replyData, tweetData, commentData });
              }
            } else {
              let replyData, tweetData, commentData;
              let allLikedTweet = [];
              res.render('../views/pages/profile', { userProfileData, postData, allLikedTweet, twitCountData, replyData, tweetData, commentData });
            }
          }
        }
      // } else {
      //   let postData, twitCountData, replyData, tweetData, commentData;
      //   let allLikedTweet = [];
      //   res.render("../views/pages/profile", { userProfileData, postData, allLikedTweet, twitCountData, replyData, tweetData, commentData });
      //   let getAllLikedData = `	select tweets.id as tweet_id, tweets.content, tweets.created_at, users.name, 
      //   users.username, bookmarks.status as isBookmarked, medias.media_url from tweet_likes 
      //   left join tweets on tweet_likes.tweet_id = tweets.id
      //   left join users on tweets.user_id = users.id
      //   left join bookmarks on tweet_likes.tweet_id = bookmarks.tweet_id   and 
      // tweet_likes.user_id = bookmarks.user_id 
      //   left join medias on tweet_likes.tweet_id = medias.tweet_id 
      //   where tweet_likes.user_id = ? and tweet_likes.status = '1';`

      //   let [allLikedTweet] = await connection.query(getAllLikedData, [id]);
      //   console.log("data of like", allLikedTweet);

      //   allLikedTweet = allLikedTweet.map((element) => {
      //     element.isLiked = 1;
      //     return element;
      //   })

        const replyDataQuery = `SELECT rt.tweet_id,rt.retweet_message,rt.user_id as retweeter, rt.created_at as retweet_date, u.username, u.name ,t.* FROM users as u INNER JOIN retweets as rt INNER JOIN tweets as t ON u.id=rt.user_id AND rt.tweet_id = t.id WHERE u.id =?`;
         [replyData] = await connection.query(replyDataQuery, [id]) || [[]];


        if (replyData[0]) {
          // console.log(replyData);
          let tweetId = replyData[0].tweet_id;
          // console.log(tweetId);
          logger.info(tweetId);
          const tweetDataQuery = `SELECT u.name,u.username,t.id,t.content,t.created_at as tweet_Date FROM tweets as t INNER JOIN users as u ON u.id = t.user_id WHERE t.id=?`;
          let [tweetData] = await connection.query(tweetDataQuery, [tweetId]);
          // console.log(tweetData);
          // if (commentData[0]) {
          //   let allLikedTweet =[];
          //   res.render('../views/pages/profile', { userProfileData, allLikedTweet, profileData, twitCountData, replyData, tweetData, commentData });
          // } else {
          //   let commentData;

          //   res.render('../views/pages/profile', { userProfileData, allLikedTweet, profileData, twitCountData, replyData, tweetData, commentData });
          // }
        } else {
          let replyData, tweetData, commentData;

          res.render('../views/pages/profile', { userProfileData, profileData, allLikedTweet, twitCountData, replyData, tweetData, commentData });
        }
      }
        let profileData, twitCountData, replyData, tweetData, commentData;
        // let allLikedTweet=[];
        res.render("../views/pages/profile", { userProfileData, profileData, allLikedTweet, twitCountData, replyData, tweetData, commentData });
      }

    }
  catch (error) {
    console.log(error);
  }
}






