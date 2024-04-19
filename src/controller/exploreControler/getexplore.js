const connection1 = require("../../../config/connection");
const ShortUniqueId = require("short-unique-id");

exports.getExplorePage = async (req, res) => {
    res.render("pages/demoexplore");
};

// api for the get all usename and hatag based in search box on change event 
exports.getUsernameOrHastagOnchage = async (req, res) => {

    let searchbox = "mihir"
    if (!searchbox) {
        return res.json({ msg: "not found" })
    }
    if (searchbox.charAt(0) == "#") {
        try {
            let sql = `SELECT DISTINCT hashtag_name FROM hashtag_lists WHERE hashtag_name LIKE '${searchbox.substring(1)}%'`

            let [result] = connection.query(sql);
            console.log(result);

        } catch (error) {
            return res.json({ error: error })
        }
    }
    else {
        try {
            let sql = `SELECT * FROM users WHERE username LIKE '${searchbox}%'`
            let [result] = connection.query(sql);
            console.log(result);
        } catch (error) {
            return res.json({ error: error })
        }
    }
};

exports.getTopTweetAndHastag = async (req, res) => {


    console.log("body is ", req.body);
    let TopTweet = `        
    SELECT users.username,
    users.id as user_id, 
    users.name, 
    COALESCE(users.profile_img_url, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOFx557XPIXXmnhk7joe2Pq2uQhb1iCJ688RgQZzH5ZA&s') as profile_img_url, 
    tweets.content,
    tweets.id as tweet_id,
    tweet_comments.content as comments, 
    CASE
      WHEN tweets.updated_at IS NOT NULL THEN
        CASE
          WHEN TIMESTAMPDIFF(SECOND, tweets.updated_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, tweets.updated_at, NOW()+1), ' seconds ago')
          WHEN TIMESTAMPDIFF(MINUTE, tweets.updated_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.updated_at, NOW()), ' minutes ago')
          WHEN TIMESTAMPDIFF(HOUR, tweets.updated_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tweets.updated_at, NOW()), ' hours ago')
          ELSE CONCAT(DATE_FORMAT(tweets.updated_at, '%d'), ' ', DATE_FORMAT(tweets.updated_at, '%M'))
        END
      ELSE
        CASE
          WHEN TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, tweets.created_at, NOW()+1), ' seconds ago')
          WHEN TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, tweets.created_at, NOW()), ' minutes ago')
          WHEN TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, tweets.created_at, NOW()), ' hours ago')
          ELSE CONCAT(DATE_FORMAT(tweets.created_at, '%d'), ' ', DATE_FORMAT(tweets.created_at, '%M'))
        END
    END as time,
    COALESCE(medias.media_url) as media_url
  FROM users
  JOIN tweets ON users.id = tweets.user_id
  LEFT JOIN medias ON tweets.id = medias.tweet_id
  LEFT JOIN tweet_comments ON tweet_comments.user_id = tweets.id 
  WHERE users.is_active = 1 AND tweets.is_posted = 1
  ORDER BY 
    CASE
      WHEN tweets.updated_at IS NOT NULL THEN tweets.updated_at
      ELSE tweets.created_at
    END DESC
      `
    let [result1] = await connection1.query(TopTweet);
    console.log(result1);
    res.json({ resultTweet: result1 })
}


exports.getUsername = async (req, res) => {

    let searchbox = "mihir"
    if (!searchbox) {
        return res.json({ msg: "not found" })
    }

    try {
        let sql = `SELECT * FROM users WHERE username LIKE '${searchbox}%'`
        let [result] = connection.query(sql);
        console.log(result);
    } catch (error) {
        return res.json({ error: error })
    }

};

exports.getMedia = async (req, res) => {

    let searchbox = "mihir"
    if (!searchbox) {
        return res.json({ msg: "not found" })
    }

    try {
        let sql = `SELECT   distinct medias.media_url
        FROM medias
        JOIN tweets ON medias.tweet_id = tweets.id
        LEFT JOIN hashtag_tweet ON tweets.id = hashtag_tweet.tweet_id
        LEFT JOIN hashtag_lists ON hashtag_tweet.hashtag_id = hashtag_lists.id
        JOIN users ON tweets.user_id = users.id
        WHERE (users.username LIKE '%demo%' OR tweets.content LIKE '%mihir%' OR hashtag_lists.hashtag_name LIKE '%demo%')
        AND medias.media_type = 'photo';`
        let [result] = connection.query(sql);
        console.log(result);
    } catch (error) {
        return res.json({ error: error })
    }

};


exports.getLatestTweet = async (req, res) => {

    let searchbox = "mihir"
    if (!searchbox) {
        return res.json({ msg: "not found" })
    }
    if (searchbox.charAt(0) == "#") {
        try {
            let sql = `SELECT tweets.*
        FROM tweets
        JOIN hashtag_tweet ON tweets.id = hashtag_tweet.tweet_id
        JOIN hashtag_lists ON hashtag_tweet.hashtag_id = hashtag_lists.id
        WHERE hashtag_lists.hashtag_name = '${searchbox.substring(1)}'
        ORDER BY tweets.created_at DESC;`

            let [result] = connection.query(sql);
            console.log(result);

        } catch (error) {
            return res.json({ error: error })
        }
    }
    else {
        try {
            let sql = `SELECT *
        FROM tweets
        JOIN users ON tweets.user_id = users.id
        WHERE tweets.content LIKE '%demo%' OR users.username LIKE '%demo%' OR users.name LIKE '%demo%'
        ORDER BY tweets.created_at DESC`
            let [result] = connection.query(sql);
            console.log(result);
        } catch (error) {
            return res.json({ error: error })
        }
    }
};
