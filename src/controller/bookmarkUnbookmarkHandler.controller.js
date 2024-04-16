const logger = require("../../logger/logger");
const connection = require("../../config/connection");

exports.bookmarkUnbookmarkHandler = async (req, res) => {
    try {
        console.log(req.user);

        let {tweetId} = req.body;
        let userId = req.user[0][0].id;
        
        let [result] = await connection.query('select * from bookmarks where tweet_id = ? and user_id = ?', [tweetId, userId]);

        if (!result.length) {
            // make new entry
            await connection.query('insert into bookmarks (tweet_id, user_id, status) values (?, ?, ?)', [tweetId, userId, 1]);

            return  res.status(200).json({
                success: true,
                bookmarkStatus: 1
            })
        } else {
            // update status
            await connection.query('update bookmarks set status = ? where tweet_id = ? and user_id = ?', [(parseInt(result[0].status)) ? 0 : 1, tweetId, userId]);

            return res.status(200).json({
                success: true,
                bookmarkStatus: (parseInt(result[0].status)) ? 0 : 1
            })
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}