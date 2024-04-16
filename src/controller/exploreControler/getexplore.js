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



    let TopTweet = `        
        SELECT tweets.id AS tweet_id, tweets.content, tweets.user_id, tweets.created_at , users.name, users.username, tweet_likes.status as isLiked, medias.media_url
              FROM tweets
              LEFT JOIN hashtag_tweet ON tweets.id = hashtag_tweet.tweet_id
            left join users on tweets.user_id = users.id
                   left join tweet_likes on tweets.user_id = tweet_likes.id
                    left join medias on tweets.id = medias.tweet_id 
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
    let [result1] = await connection1.query(TopTweet);
    console.log(result1);
    res.json({ result1 })
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
