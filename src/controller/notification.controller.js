const connection = require("../../config/connection");

exports.notification = (req, res) => {
  res.render("pages/notification");
};
exports.getNotifications = async (req, res) => {
  let sql = `select notifications.id as notification_id,notifications.type as notification_type, users.name, 
  users.username, users.is_active as logged_in, followers.following_id, tweets.id as tweet_id, tweets.content, tweet_likes.status as likes, tweets.created_at from notifications 
    left join users 
    on notifications.user_id = users.id 
    left join followers
    on notifications.user_id = followers.follower_id
    left join tweets
    on notifications.user_id = tweets.user_id
    left join tweet_likes
    on notifications.user_id = tweet_likes.user_id
    where users.id = ? and users.is_active = ?`;
  let [all_tweets] = await connection.query(sql, [1, 1]);
  // console.log(all_tweets);

  // logins notification
  let login_notification = `select notifications.id as notification_id,notifications.type as notification_type, users.id as user_id,users.name, users.username, users.is_active as logged_in from notifications 
  left join users 
  on notifications.user_id = users.id 
  where users.id = ? `;
  let [logged_in] = await connection.query(login_notification, [2]);
  // console.log(logged_in);

  let date = new Date(all_tweets[0].created_at);
  var months_arr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months_arr[date.getMonth()];

  let login;
  if (logged_in[0].logged_in === 1) {
    login = `There was a login to your account @${
      logged_in[0].username
    } from a new device on '${month}' '${date.getDate()}', '${date.getFullYear()}'. Review it now.`;
    // ${req.user[0][0].id}
  }

  // likes notification
  let like_notification = `select notifications.id as notification_id, notifications.related_user_id as other_user, notifications.type as notification_type, users.id as user_id, users.username,
  users.is_active as logged_in, tweets.id as tweet_id, tweets.content, tweet_likes.status as likes, tweet_likes.created_at from notifications 
  left join users 
  on notifications.user_id = users.id 
  left join tweets
  on notifications.user_id = tweets.user_id
  left join tweet_likes
  on notifications.user_id = tweet_likes.user_id
  where users.id = 2 and tweets.id = 2 and related_user_id = 1 and tweet_likes.status = 1`;

  
  let [all_likes] = await connection.query(like_notification);
  console.log(all_likes);
  let like;
  if (all_likes[0].likes === 1) {
    like = `${all_likes[0].other_user} like your tweet. \n`;
    like += all_likes[0].content;
  }
  let follow;
  if (all_tweets[0].following_id) {
    follow = `${all_tweets[0].username} followed you.`;
  }

  res.status(200).json({
    success: true,
    message: "in notification",
    login,
    follow,
    like,
  });
};
