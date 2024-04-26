const logger = require("../../logger/logger");
const connection = require("../../config/connection");

exports.removeAllBookmarkHandler = async (req, res) => {
    try {
        let userId = req.user[0][0].id;
        
        let sql = `update bookmarks set status = 0 where user_id = ?`;
        let [result] = await connection.query(sql, [userId]);

        res.status(200).json({
            success: true,
            message: "all bookmarks are removed"
        })

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}