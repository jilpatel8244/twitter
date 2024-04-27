const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.getAllFollowersList = async (req, res) => {
    try {
        let sql = `
        select users.id, users.name, users.username, users.profile_img_url,
        CASE
            WHEN TIMESTAMPDIFF(SECOND,  max(direct_messages.created_at), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND,  max(direct_messages.created_at), NOW()), ' seconds ago')
            WHEN TIMESTAMPDIFF(MINUTE,  max(direct_messages.created_at), NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE,  max(direct_messages.created_at), NOW()), ' minutes ago')
            WHEN TIMESTAMPDIFF(HOUR,  max(direct_messages.created_at), NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR,  max(direct_messages.created_at), NOW()), ' hours ago')
            ELSE CONCAT(DATE_FORMAT( max(direct_messages.created_at), '%d'), ' ', DATE_FORMAT( max(direct_messages.created_at), '%M'))
        END as time
        from users left join 
        direct_messages 
        on users.id = direct_messages.sender_id and direct_messages.receiver_id = ${req.user[0][0].id} 
        where users.id in 
        (select followers.follower_id from followers where followers.following_id = ${req.user[0][0].id} and followers.follower_id in (
            select following_id from followers where followers.follower_id = ${req.user[0][0].id} and followers.is_blocked = 0 and followers.current_status = 1
        )) group by users.id;`;

        let [allFollowers] = await connection.query(sql);

        res.status(200).json({
            success: true,
            message: allFollowers
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}