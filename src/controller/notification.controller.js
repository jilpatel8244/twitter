const connection = require("../../config/connection");
const logger = require("../../logger/logger");

exports.notification = async (req, res) => {
  res.render("pages/notification");
};

exports.getNotifications = async (req, res) => {
  let logger_id = req.user[0][0].id;
  const [notifications] = await connection.query(
    `SELECT n.*, u.username AS username, t.content AS tweet_content, c.content AS reply
    FROM notifications n
    LEFT JOIN users u ON n.related_user_id = u.id
    LEFT JOIN tweets t ON n.tweet_id = t.id
    LEFT JOIN tweet_comments c ON n.tweet_id = c.id 
    WHERE n.user_id = ?
    ORDER BY n.created_at DESC;`,
    [logger_id]
  );
  notifications.forEach(async (notification) => {
    switch (notification.type) {
      case "Follow":
        const [followData] = await connection.query(
          `SELECT follower.username AS follower_username, followed.username AS followed_username
          FROM followers
          JOIN users AS follower ON followers.following_id = follower.id
          JOIN users AS followed ON followers.follower_id = followed.id
          WHERE followers.follower_id = ?;`,
          [logger_id]
        );

        followData.forEach((followers) => {
          // console.log(followers);
          notification.username = followers.follower_username;
        });

        break;
      case "Comment":
        const [CommentData] = await connection.query(
          "select username from users where id = ?",
          [notification.related_user_id]
        );
        notification.username = CommentData[0].username;

        break;

      case "Like":
      case "New Tweet":
      case "replay_tweet":
      case "Retweet":
        const [actionUserData] = await connection.query(
          "select username from users where id = ?",
          [notification.related_user_id]
        );
        notification.username = actionUserData[0].username;
        break;
      case "Login":
        break;
      case "Password_reset":
        break;
      default:
        console.warn("Unknwon notification type : ", notification.type);
    }
    // console.log(notification);
  });

  res.status(200).json({
    notifications,
  });
};
