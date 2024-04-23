const logger = require("../../logger/logger");
const connection = require("../../config/connection");

exports.notification = async (req, res) => {
  res.render("pages/notification", { user: req.user[0][0] });
};

exports.getNotifications = async (req, res) => {
  try {
    let logger_id = req.user[0][0].id;
    const notifications = await getAllNotifications(logger_id);
    const verifiedNotification = await getVerifiedNotifications(logger_id);
    const mentionNotification = await getMentionNotifications(logger_id);

    const [logNotification] = await connection.query(
      `SELECT n.*, u.username AS username,n.created_at
    FROM notifications n
    LEFT JOIN users u ON n.user_id = u.id
    WHERE n.user_id = ? AND n.type = "Login"
    ORDER BY n.created_at DESC;`,
      [logger_id]
    );

    let [notificationCount] = await connection.execute(
      `select count(*) as count from notifications where user_id = 1 and  is_read = 0 and  type != "Login";`,
      [logger_id]
    );
    let countNotification = notificationCount[0].count;

    res.status(200).json({
      success: true,
      logNotification,
      notifications,
      verifiedNotification,
      mentionNotification,
      countNotification,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

async function getAllNotifications(userId) {
  const [notifications] = await connection.query(
    `SELECT n.*, u.username AS username, u2.name AS related_user_name, u2.username AS related_username,u2.profile_img_url, t.*, t.content AS tweet_content,
    n.created_at,
    CASE
      WHEN TIMESTAMPDIFF(SECOND, n.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, n.created_at, NOW()), ' seconds ago')
      WHEN TIMESTAMPDIFF(MINUTE, n.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, n.created_at, NOW()), ' minutes ago')
      WHEN TIMESTAMPDIFF(HOUR, n.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, n.created_at, NOW()), ' hours ago')
      ELSE CONCAT(DATE_FORMAT(n.created_at, '%d'), ' ', DATE_FORMAT(n.created_at, '%M'))
    END AS time
    FROM notifications n
    LEFT JOIN users u ON n.user_id = u.id
    LEFT JOIN users u2 ON n.related_user_id = u2.id
    LEFT JOIN tweets t ON n.tweet_id = t.id
    WHERE n.user_id = ? and n.related_user_id != ? 
    ORDER BY n.created_at DESC;`,
    [userId, userId]
  );
  // console.log(notifications);
  return notifications;
}

async function getVerifiedNotifications(userId) {
  const [notifications] = await connection.query(
    `SELECT  f.current_status, n.*, u.username AS username,u2.profile_img_url,  u2.name AS related_user_name, u2.username AS related_username, t.*, t.content AS tweet_content, n.created_at,
    CASE
    WHEN TIMESTAMPDIFF(SECOND, t.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, t.created_at, NOW()), ' seconds ago')
    WHEN TIMESTAMPDIFF(MINUTE, t.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, t.created_at, NOW()), ' minutes ago')
    WHEN TIMESTAMPDIFF(HOUR, t.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, t.created_at, NOW()), ' hours ago')
    ELSE CONCAT(DATE_FORMAT(t.created_at, '%d'), ' ', DATE_FORMAT(t.created_at, '%M'))
    END as time
    FROM notifications n
    LEFT JOIN users u ON n.user_id = u.id
    LEFT JOIN users u2 ON n.related_user_id = u2.id
    LEFT JOIN followers f ON n.related_user_id = f.follower_id
    LEFT JOIN tweets t ON n.tweet_id = t.id
    WHERE n.user_id = ? AND n.related_user_id  in (u2.id) AND u2.is_varified = 1 AND f.current_status = 1 AND n.user_id = f.following_id 
    AND n.related_user_id = f.follower_id
    ORDER BY n.created_at DESC;`,
    [userId]
  );
  return notifications;
}

async function getMentionNotifications(userId) {
  const [mentionNotifications] = await connection.query(
    ` SELECT f.current_status, n.*, u.username AS username, u2.profile_img_url,  u2.name AS related_user_name, u2.username AS related_username, t.*, t.content AS tweet_content, 
    CASE
        WHEN TIMESTAMPDIFF(SECOND, n.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, n.created_at, NOW()), ' seconds ago')
        WHEN TIMESTAMPDIFF(MINUTE, n.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, n.created_at, NOW()), ' minutes ago')
        WHEN TIMESTAMPDIFF(HOUR, n.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, n.created_at, NOW()), ' hours ago')
        ELSE CONCAT(DATE_FORMAT(n.created_at, '%d'), ' ', DATE_FORMAT(n.created_at, '%M'))
      END AS time
    FROM notifications n
    LEFT JOIN users u ON n.user_id = u.id
    LEFT JOIN users u2 ON n.related_user_id = u2.id
    LEFT JOIN followers f ON u.id = f.follower_id AND u2.id = f.following_id 
    LEFT JOIN tweets t ON n.tweet_id = t.id
    WHERE n.user_id = 1 AND u.username IN  (u.username) AND n.type = "Mention" 
    AND f.is_blocked = 0
    ORDER BY n.created_at DESC;`,
    [userId]
  );
  return mentionNotifications;
}
