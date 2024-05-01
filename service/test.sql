
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


--  in controller 
const mentionedUsernames = extractMentionedUsernames(
  -- notification.tweet_content
  "hello there @jil and @harsh @Parmeshvar!!! what is your opinion on this tweet functionality"
);
const mentionedUsers = await getUsersByUsernames(mentionedUsernames);
--  console.log(mentionedUsers);


-- functions
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


-- changes in notifications table
alter table notifications add column is_read tinyint default 0;

--changes in users table
alter table users add column profession varchar(255);

alter table users add column prof_desc varchar(255);

alter table users drop column is_private; 

alter table users add column is_private tinyint default 1;


CREATE TABLE `temp_twitter`.`verification_requests` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `request` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `user_id`));


  ALTER TABLE `verification_requests` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);


-- for profession data will add like this
-- by switching to profesaional, your account will no longer private. if private
update users set is_private = 0, profession = "Programmer",
prof_desc = "I'm a passinate developer who always willing to learn, and apply those things in practice" where id = 1;

CREATE TABLE `get_support` (
  `id` VARCHAR(255) PRIMARY KEY,
  `user_id` INT NOT NULL,
  `content` VARCHAR(255),
  `url` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP  DEFAULT (NULL),
  `deleted_at` TIMESTAMP  DEFAULT(NULL)
);


  ALTER TABLE `get_support` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

  -- new table 
CREATE TABLE `support_messages` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content` text,
  `content` text
);

ALTER TABLE `support_messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
ALTER TABLE `support_messages` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);
-- modified on 29th aprill 

-- add new table message_medias and remove table unread_messages

CREATE TABLE `direct_messages` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content_type` VARCHAR(255),
  `content` text,
  `is_read` boolean,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);

ALTER TABLE `support_messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
ALTER TABLE `support_messages` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);
ALTER TABLE `direct_messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
ALTER TABLE `direct_messages` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);


CREATE TABLE `message_medias` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `message_id` INT NOT NULL,
  `url` text,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `message_medias` ADD FOREIGN KEY (`message_id`) REFERENCES `direct_messages` (`id`);

--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

-- changes 1 may 2024
-- rajni
ALTER TABLE temp_twitter.tweets ADD column retweet_id INT;
ALTER TABLE temp_twitter.tweets ADD FOREIGN KEY (retweet_id) REFERENCES temp_twitter.retweets (id);


-- jeel
CREATE TABLE `direct_messages` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content_type` VARCHAR(255),
  `content` text,
  `is_read` boolean,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);

ALTER TABLE `direct_messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
ALTER TABLE `direct_messages` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);


CREATE TABLE `message_medias` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `message_id` INT NOT NULL,
  `url` text,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `message_medias` ADD FOREIGN KEY (`message_id`) REFERENCES `direct_messages` (`id`);

-- mihir

CREATE TABLE `get_support` (
  `id` VARCHAR(255) PRIMARY KEY,
  `user_id` INT NOT NULL,
  `content` VARCHAR(255),
  `url` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP  DEFAULT (NULL),
  `deleted_at` TIMESTAMP  DEFAULT(NULL)
);

  ALTER TABLE `get_support` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

  -- new table 
CREATE TABLE `support_messages` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content` text
);

ALTER TABLE `support_messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
ALTER TABLE `support_messages` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

-- execute this query in database
alter table temp_twitter.tweets add column retweet_id INT;
ALTER TABLE temp_twitter.tweets ADD FOREIGN KEY (retweet_id) REFERENCES temp_twitter.retweets (id);
