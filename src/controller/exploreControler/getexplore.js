const { CLIENT_RENEG_LIMIT } = require("tls");
const connection = require("../../../config/connection");
const ShortUniqueId = require("short-unique-id");

exports.getExplorePage = async (req, res) => {
  res.render("pages/explore", { user: req.user[0][0] });
};



exports.getverifyuser = async (req, res) => {


};
// api for the get all usename and hatag based in search box on change event
exports.getUsernameOrHastagOnchage = async (req, res) => {
  let searchbox = req.body.searchbox;

  searchbox = searchbox.trim();

  if (!searchbox) {
    return res.json({ msg: "not found", type: 2 });
  }
  if (searchbox.charAt(0) == "#") {
    try {
      let sql = `SELECT DISTINCT hashtag_name FROM hashtag_lists WHERE hashtag_name LIKE '${searchbox.substring(
        1
      )}%'`;

      let [result] = await connection.query(sql);
      return res.json({ result: result, type: 0 });
    } catch (error) {
      return res.json({ error: error });
    }
  } else {
    try {
      let sql = `SELECT * FROM users WHERE username LIKE '${searchbox}%' or name LIKE '${searchbox}%' and is_active=1`;
      let [result] = await connection.query(sql);
      return res.json({ result: result, type: 1 });
    } catch (error) {
      return res.json({ error: error });
    }
  }
};

exports.getTopTweetAndHastag = async (req, res) => {
  let search = req.body.search;

  try {
    let TopTweet = `
    SELECT users.username,users.id as user_id,users.name,
bookmarks.status as isBookmarked,users.profile_img_url as profile_img_url, 
        tweets.content,tweets.id as tweet_id,tweet_comments.content as comments,tweets.created_at as time,medias.media_url as media_url,(SELECT COUNT(*) FROM retweets where retweets.tweet_id=tweets.id and retweets.deleted_at IS NULL) as repostCount,retweets.deleted_at as notRetweeted,retweets.created_at as createdAt,retweets.retweet_message as retweetMsg,
        (SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id AND tweet_likes.status = 1) as likeCount
        FROM users
        JOIN tweets ON users.id = tweets.user_id LEFT JOIN medias ON tweets.id = medias.tweet_id
        LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id 
        LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id left join retweets on retweets.tweet_id=tweets.id and retweets.user_id = ? and retweets.deleted_at IS NULL
        WHERE tweets.content LIKE '%${search}%' OR tweets.id IN (SELECT tweet_id FROM hashtag_tweet WHERE hashtag_id IN (SELECT id FROM hashtag_lists WHERE hashtag_name LIKE  '%${search}%')
        ) OR tweets.user_id IN (SELECT id FROM users WHERE username LIKE '%${search}%')
        ORDER BY (SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id AND tweet_likes.status = 1) DESC;
    `


    let [result1] = await connection.query(TopTweet, [req.user[0][0].id]);

    return res.json({ resultTweet: result1 });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

exports.getHastag = async (req, res) => {
  try {
    let TopHashtag = `SELECT hl.hashtag_name, COUNT(ht.hashtag_id) AS usage_count
        FROM hashtag_lists hl
        JOIN hashtag_tweet ht ON hl.id = ht.hashtag_id
        GROUP BY hl.hashtag_name
        ORDER BY usage_count DESC;`;

    let [result] = await connection.query(TopHashtag);

    res.json({ resultHastag: result });
  } catch (error) {
    res.json({ error });
  }
};

exports.getUsername = async (req, res) => {
  let search = req.body.searchbox;
  loggedInUserId = req.user[0][0].id;
  if (!search) {
    search = "";
  }
  if (search.charAt(0) == "#") {
    search = search.substring(1);
  }
  try {
    if (req.body.type == 0) {
      let sql = `          
        SELECT u.id, u.username, u.profile_img_url, u.email, u.password, u.name, u.created_at, u.updated_at,
        IFNULL((SELECT f.current_status FROM followers f WHERE f.follower_id = ? AND f.following_id = u.id), 0) AS current_status
        FROM users u WHERE u.username LIKE '%${search}%' AND u.is_active = 1 limit 3;`;
      let [result] = await connection.query(sql, loggedInUserId);

      res.json({ username: result });
    } else {
      let sql = `         
      SELECT u.id, u.username,u.profile_img_url,  u.email, u.password, u.name, u.created_at, u.updated_at,
      IFNULL((SELECT f.current_status FROM followers f WHERE f.follower_id = ${loggedInUserId} AND f.following_id = u.id), 0) AS current_status
      FROM users u WHERE u.username LIKE '%${search}%' AND u.is_active = 1;`;
      let [result] = await connection.query(sql);



      res.json({ username: result });
    }
  } catch (error) {

    return res.json({ error: error });
  }
};

exports.getMedia = async (req, res) => {
  // let searchbox = req.body.searchbox;
  let searchbox = "demo";

  if (!searchbox) {
    return res.json({ msg: "not found" });
  }

  try {
    searchbox = searchbox.trim();
    let sql = `SELECT   distinct medias.media_url
        FROM medias
        JOIN tweets ON medias.tweet_id = tweets.id
        LEFT JOIN hashtag_tweet ON tweets.id = hashtag_tweet.tweet_id
        LEFT JOIN hashtag_lists ON hashtag_tweet.hashtag_id = hashtag_lists.id
        JOIN users ON tweets.user_id = users.id
        WHERE (users.username LIKE '%${searchbox}%' OR tweets.content LIKE '%${searchbox}%' OR hashtag_lists.hashtag_name LIKE '%${searchbox}%')
        AND medias.media_type LIKE '%image%';`;
    let [result] = await connection.query(sql);
    return res.json({ media: result });
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.getLatestTweet = async (req, res) => {
  let search = req.body.search;

  console.log(search);
  if (!search) {
    return res.json({ msg: "not found" });
  }
  if (search.charAt(0) == "#") {
    try {
      let sql = `  
                  
SELECT  users.username,tweets.created_at as time, users.id as user_id, tweet_likes.status as isLiked, users.name, bookmarks.status as isBookmarked,users.profile_img_url as profile_img_url,tweets.content,tweets.id as tweet_id,(SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id AND tweet_likes.status = 1) as likeCount,tweet_comments.content as comments,medias.media_url as media_url,(SELECT COUNT(*) FROM retweets where retweets.tweet_id=tweets.id and retweets.deleted_at IS NULL) as repostCount,retweets.deleted_at as notRetweeted,
retweets.created_at as createdAt,retweets.retweet_message as retweetMsg FROM users
JOIN tweets ON users.id = tweets.user_id LEFT JOIN medias ON tweets.id = medias.tweet_id
            LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id 
             LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweets.id and tweet_likes.user_id = ?
          LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id JOIN hashtag_tweet ON tweets.id = hashtag_tweet.tweet_id JOIN hashtag_lists ON hashtag_tweet.hashtag_id = hashtag_lists.id left join retweets on retweets.tweet_id=tweets.id and retweets.user_id = ? and retweets.deleted_at IS NULL WHERE  hashtag_lists.hashtag_name like '%${search.substring(1)}%'ORDER BY tweets.created_at DESC;

`;


      let [result] = await connection.query(sql, [req.user[0][0].id, req.user[0][0].id]);
      return res.json({ resultTweet: result });
    } catch (error) {
      return res.json({ error: error });
    }
  } else {
    try {
      let sql = `
      SELECT users.username,users.id as user_id,tweets.created_at as time, tweet_likes.status as isLiked,bookmarks.status as isBookmarked, users.name, users.profile_img_url as
       profile_img_url,(SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id AND tweet_likes.status = 1) as likeCount, tweets.content,tweets.id as tweet_id,tweet_comments.content as comments, 
            medias.media_url as media_url,(SELECT COUNT(*) FROM retweets where retweets.tweet_id=tweets.id and retweets.deleted_at IS NULL) as repostCount,retweets.deleted_at as notRetweeted,
            retweets.created_at as createdAt,retweets.retweet_message as retweetMsg
            FROM users JOIN tweets ON users.id = tweets.user_id LEFT JOIN medias ON tweets.id = medias.tweet_id LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id 
              LEFT JOIN bookmarks ON bookmarks.tweet_id = tweets.id 
                 LEFT JOIN tweet_likes ON tweet_likes.tweet_id = tweets.id and tweet_likes.user_id = ?
              left join retweets on retweets.tweet_id=tweets.id and retweets.user_id = ? and retweets.deleted_at IS NULL WHERE  tweets.content LIKE '%${search}%' OR users.username LIKE '%${search}%' OR users.name LIKE '%${search}%' ORDER BY tweets.created_at DESC;
      `;


      let [result] = await connection.query(sql, [req.user[0][0].id, req.user[0][0].id]);
      return res.json({ resultTweet: result });
    } catch (error) {
      return res.json({ error: error });
    }
  }
};
