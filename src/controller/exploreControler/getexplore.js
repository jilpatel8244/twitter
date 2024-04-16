const connection = require("../../../config/connection");
const ShortUniqueId = require("short-unique-id");

exports.getExplorePage = async (req, res) => {
    res.render("pages/tweets");
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

    try {
        let TopHashtag = `SELECT hl.hashtag_name, COUNT(ht.hashtag_id) AS usage_count
      FROM hashtag_lists hl
      JOIN hashtag_tweet ht ON hl.id = ht.hashtag_id
      GROUP BY hl.hashtag_name
      ORDER BY usage_count DESC;`

        let [result] = connection.query(TopHashtag);
        console.log(result);

        let TopTweet = `SELECT tweets.id AS tweet_id, tweets.content, tweets.user_id, tweets.created_at
      FROM tweets
      LEFT JOIN hashtag_tweet ON tweets.id = hashtag_tweet.tweet_id
      LEFT JOIN users ON tweets.user_id = users.id
      WHERE tweets.content LIKE '%demo%' OR tweets.id IN (
          SELECT tweet_id FROM hashtag_tweet WHERE hashtag_id IN (
              SELECT id FROM hashtag_lists WHERE hashtag_name LIKE '%demo%'
          )
      ) OR tweets.user_id IN (
          SELECT id FROM users WHERE username LIKE '%demo%'
      )
      ORDER BY (
          SELECT COUNT(*) FROM tweet_likes WHERE tweet_likes.tweet_id = tweets.id AND tweet_likes.status = 1
      ) DESC;
      `
        let [result1] = connection.query(TopTweet);
        console.log(result);

    } catch (error) {

        return res.json({ error: error })
    }
};

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
