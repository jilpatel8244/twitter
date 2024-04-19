const logger = require("../../logger/logger");
const connection = require("../../config/connection");

exports.getMessagesPage = async (req, res) => {
    try {
        // let sql = `select users.id, users.name, users.username, users.profile_img_url from users inner join followers on users.id = followers.follower_id and followers.following_id = ${req.user[0][0].id} and followers.current_status = 1;`
        let sql = `select * from users where users.id in (select followers.follower_id from followers where followers.following_id = ${req.user[0][0].id} and followers.follower_id in (select following_id from followers where followers.follower_id = ${req.user[0][0].id} and followers.is_blocked = 0 and followers.current_status = 1));`;

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
        let { senderId, reciverId, message } = req.body;
        let content_type = 'text';

        if (req.file) {
            message = req.file.filename;
            content_type = 'media';
        }

        let sql = `insert into direct_messages (sender_id, receiver_id, content, content_type) values ( ?, ?, ?, ? );`;

        let lastInsertedId = await connection.query(sql, [ senderId, reciverId, message, content_type ]);

        sql = `insert into unread_messages (user_id, message_id, is_read) values ( ?, ?, ? )`;

        await connection.query(sql, [ reciverId, lastInsertedId[0].insertId, 0 ]);

        return res.status(200).json({
            success: true,
            message: {
                'senderId': senderId,
                'reciverId': reciverId,
                'message': message,
                'content_type': content_type  
            }
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}