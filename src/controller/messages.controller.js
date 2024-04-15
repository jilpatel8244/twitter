const logger = require("../../logger/logger");
const connection = require("../../config/connection");

exports.getMessagesPage = async (req, res) => {
    try {
        let sql = `select users.id, users.name, users.username, users.profile_img_url from users inner join followers on users.id = followers.follower_id and followers.following_id = ${req.user[0][0].id} and followers.current_status = 1;`

        let [allFollowers] = await connection.query(sql);

        res.render('pages/messages.ejs', {
            allFollowers: allFollowers,
            user: req.user[0][0].id
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.storeMessageHandler = async (req, res) => {
    try {
        console.log(req.body);

        let { senderId, reciverId, message } = req.body;

        let sql = `insert into direct_messages (sender_id, receiver_id, content) values ( ?, ?, ? );`;

        await connection.query(sql, [ senderId, reciverId, message ]);

        return res.status(200).json({
            success: true,
            message: req.body
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}