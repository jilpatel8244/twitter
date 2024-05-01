const connection = require("../../config/connection");
const logger = require("../../logger/logger")

exports.getAllTrendingHashtagsHandler = async (req, res) => {
    try {
        let sql = `select count(hashtag_id) as count, hashtag_name from hashtag_tweet join hashtag_lists on hashtag_lists.id = hashtag_tweet.hashtag_id group by hashtag_id order by count desc limit 10`;

        let [data] = await connection.query(sql);

        res.status(200).json({
            success: true,
            message: data
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}