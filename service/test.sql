
INSERT INTO countries (name) VALUES ('India');
INSERT INTO states (name, country_id) VALUES ('Gujarat', 1);
INSERT INTO cities (name, state_id) VALUES ('Surat', 1);
INSERT INTO roles (role_name) VALUES ('user');
INSERT INTO users (username, email, password, name, date_of_birth, country_id, state_id, city_id, role_id, is_active, is_private, is_varified)
VALUES ('Param', 'chetu1131@gmail.com', '1234', 'Parmeshvar Parmar', '2001-03-11', 1, 1, 1, 1, 1, 0, 0);
INSERT INTO role_users (role_id, user_id) VALUES (1, 1);


INSERT INTO notifications (user_id, tweet_id, type, related_user_id)
VALUES (1, 1, 'Like', 2);
INSERT INTO followers (following_id, follower_id, is_blocked, current_status)
VALUES (2, 1, 0, 1);
INSERT INTO tweet_likes (user_id, tweet_id, status)
VALUES (1, 1, 1);
INSERT INTO tweet_comments (user_id, tweet_id, content)
VALUES (1, 1, 'This is a great tweet! Keep it up.');
INSERT INTO comment_likes (comment_id, user_id, status)
VALUES (1, 1, 1);
INSERT INTO bookmarks (tweet_id, user_id, status)
VALUES (1, 1, 1);
INSERT INTO hashtag_lists (hashtag_name)
VALUES ('technology');
INSERT INTO hashtag_tweet (hashtag_id, tweet_id, status)
VALUES (1, 1, 1);
INSERT INTO retweets (tweet_id, user_id, retweet_message)
VALUES (1, 1, 'Check this out!');
INSERT INTO direct_messages (sender_id, receiver_id, content)
VALUES (1, 2, 'Hello, how are you?');

-- notifications
-- apply this query as well as while you inserting your data 
-- like
INSERT INTO notifications (user_id, tweet_id, type, related_user_id)
VALUES (?, ?, 'Like', ?);
-- comment
INSERT INTO notifications (user_id, tweet_id, type, related_user_id)
VALUES (?, ?, 'Comment', ?);
-- follow
INSERT INTO notifications (user_id, type, related_user_id)
VALUES (?, 'Follow', ?);
-- reply
INSERT INTO notifications (user_id, tweet_id, type, related_user_id)
VALUES (?, ?, 'Reply', ?);
-- reteets
INSERT INTO notifications (user_id, tweet_id, type, related_user_id)
VALUES (?, ?, 'Retweet', ?);

-- fetch notification
 SELECT n.*, u.username AS username, t.content AS tweet_content, c.content AS reply
    FROM notifications n
    LEFT JOIN users u ON n.related_user_id = u.id
    LEFT JOIN tweets t ON n.tweet_id = t.id
    LEFT JOIN tweet_comments c ON n.tweet_id = c.id 
    WHERE n.user_id = 1
    ORDER BY n.created_at DESC;


-- modified notifications table
CREATE TABLE `notifications` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tweet_id` INT,
  `type` VARCHAR(255),
  `is_read` tinyint DEFAULT 0, 
  `related_user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

 


// in controller 

const mentionedUsernames = extractMentionedUsernames(
  // notification.tweet_content
  "hello there @jil and @harsh @Parmeshvar!!! what is your opinion on this tweet functionality"
);
const mentionedUsers = await getUsersByUsernames(mentionedUsernames);
// console.log(mentionedUsers);

// functions
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
