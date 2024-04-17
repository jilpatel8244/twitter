const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.notification = async (req, res) => {
  res.render("pages/notification");
};

exports.getNotifications = async (req, res) => {
  let logger_id = req.user[0][0].id;
  const [notifications] = await connection.query(
    `SELECT f.current_status, n.*, u.username AS username, u2.name AS related_user_name, u2.username AS related_username, t.*, t.content AS tweet_content, n.created_at,
    CASE
    WHEN TIMESTAMPDIFF(SECOND, t.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, t.created_at, NOW()), ' seconds ago')
    WHEN TIMESTAMPDIFF(MINUTE, t.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, t.created_at, NOW()), ' minutes ago')
    WHEN TIMESTAMPDIFF(HOUR, t.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, t.created_at, NOW()), ' hours ago')
    ELSE CONCAT(DATE_FORMAT(t.created_at, '%d'), ' ', DATE_FORMAT(t.created_at, '%M'))
    END as time
    FROM notifications n
    LEFT JOIN users u ON n.user_id = u.id
    LEFT JOIN users u2 ON n.related_user_id = u2.id
    LEFT JOIN followers f ON n.user_id = f.follower_id
    LEFT JOIN tweets t ON n.tweet_id = t.id
    WHERE n.user_id = ? AND f.current_status = 1
    ORDER BY n.created_at DESC;`,
    [logger_id]
  );

  console.log(notifications);
  const [verifiedNotification] = await connection.query(
    `SELECT  f.current_status, n.*, u.username AS username, u2.name AS related_user_name, u2.username AS related_username, t.*, t.content AS tweet_content, n.created_at,
     CASE
     WHEN TIMESTAMPDIFF(SECOND, t.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(SECOND, t.created_at, NOW()), ' seconds ago')
     WHEN TIMESTAMPDIFF(MINUTE, t.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, t.created_at, NOW()), ' minutes ago')
     WHEN TIMESTAMPDIFF(HOUR, t.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, t.created_at, NOW()), ' hours ago')
     ELSE CONCAT(DATE_FORMAT(t.created_at, '%d'), ' ', DATE_FORMAT(t.created_at, '%M'))
     END as time
     FROM notifications n
     LEFT JOIN users u ON n.user_id = u.id
     LEFT JOIN users u2 ON n.related_user_id = u2.id
     LEFT JOIN followers f ON n.related_user_id = f.following_id
     LEFT JOIN tweets t ON n.tweet_id = t.id
     WHERE n.user_id = ? AND u.is_varified = 1 AND u2.is_varified = 1 AND f.current_status = 1
     ORDER BY n.created_at DESC;`,
    [logger_id]
  );
  // console.log(notifications);
  const mentionedUsernames = extractMentionedUsernames(
    // notification.tweet_content
    "hello there @jil and @harsh !!! what is your opinion on this tweet functionality"
  );
  const mentionedUsers = await getUsersByUsernames(mentionedUsernames);
  // console.log(mentionedUsers);

  res.status(200).json({
    notifications,
    verifiedNotification,
  });
};

function extractMentionedUsernames(tweetContent) {
  const regex = /@(\w+)/g;
  const matches = tweetContent.match(regex);
  if (matches) {
    return matches.map((match) => match.substring(1));
  }
  return [];
}

async function getUsersByUsernames(usernames) {
  if (usernames.length === 0) {
    return [];
  }
  const [users] = await connection.query(
    "SELECT id, username FROM users WHERE username IN (?)",
    [usernames]
  );
  return users;
}
