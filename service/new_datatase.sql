

CREATE TABLE `roles` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP DEFAULT (utc_timestamp())
);

insert into roles (id,role_name) values('1','user');
insert into roles (id,role_name) values('2','verified_user');
insert into roles (id,role_name) values('3','admin');

CREATE TABLE `permissions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `permission_name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP ,
  `deleted_at` TIMESTAMP
);

CREATE TABLE `role_permissions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL
);
ALTER TABLE `role_permissions` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
ALTER TABLE `role_permissions` ADD FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

CREATE TABLE `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255),
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255),
  `name` VARCHAR(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `profile_img_url` VARCHAR(255),
  `cover_img_url` VARCHAR(255),
  `bio` VARCHAR(255),
  `activation_code` VARCHAR(100),
  `salt` VARCHAR(45),
  `is_active` tinyint default 0,
  `role_id` INT default 1,
  `is_private` tinyint default 1,
  `is_varified` tinyint default 0,
   `profession` varchar(255) DEFAULT NULL,
  `prof_desc` varchar(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL
);
ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

-- if you don't want to drop table -> just drop column like below


CREATE TABLE `role_users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `user_id` INT NOT NULL
);


CREATE TABLE `logs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `is_successfull` tinyint default 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp())
);
ALTER TABLE `logs` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `followers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `following_id` INT,
  `follower_id` INT,
  `is_blocked` tinyint default 0,
  `current_status` tinyint default 0 
);



CREATE TABLE `tweets` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` VARCHAR(255) NOT NULL,  -- if more then we can user text
  `is_drafted` tinyint default 0,
  `is_posted` tinyint default 0,
  `created_at` TIMESTAMP DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP,
  `deleted_at` TIMESTAMP 
);





CREATE TABLE `medias` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `tweet_id` INT NOT NULL,
  `media_url` VARCHAR(255),
  `media_type` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);


CREATE TABLE `tweet_comments` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `tweet_id` INT,
  `content` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);


CREATE TABLE `reply_comments` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `comment_id` INT,
  `content` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);


CREATE TABLE `tweet_likes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `tweet_id` INT,
  `status` boolean,
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp())
);



CREATE TABLE `comment_likes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `comment_id` INT,
  `user_id` INT,
  `status` boolean,
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp())
);


CREATE TABLE `bookmarks` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `tweet_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `status` boolean,
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp())
);


CREATE TABLE `notifications` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tweet_id` INT,
  `type` VARCHAR(255),
  `related_user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp())
);
 


CREATE TABLE `hashtag_lists` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `hashtag_name` VARCHAR(50),
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp())
);

CREATE TABLE `hashtag_tweet` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `hashtag_id` INT NOT NULL,
  `tweet_id` INT NOT NULL,
  `status` tinyint,
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp())
);


CREATE TABLE `retweets` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `tweet_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `retweet_message` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);


CREATE TABLE `direct_messages` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content_type` VARCHAR(255),
  `content` text,
  `is_read` boolean,
  `created_at` TIMESTAMP DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);




CREATE TABLE `message_medias` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `message_id` INT NOT NULL,
  `url` text,
  `created_at` TIMESTAMP DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);



CREATE TABLE `get_support` (
  `id` VARCHAR(255) PRIMARY KEY,
  `user_id` INT NOT NULL,
  `content` VARCHAR(255),
  `url` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT (utc_timestamp()),
  `updated_at` TIMESTAMP  DEFAULT (NULL),
  `deleted_at` TIMESTAMP  DEFAULT(NULL)
);

  
CREATE TABLE `support_messages` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content` text
);

ALTER TABLE `support_messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
ALTER TABLE `support_messages` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);
ALTER TABLE twitter.tweets ADD column retweet_id INT;
ALTER TABLE twitter.tweets ADD FOREIGN KEY (retweet_id) REFERENCES twitter.retweets (id);
ALTER TABLE `tweets` ADD FOREIGN KEY (`retweet_id`) REFERENCES `retweets` (`id`);

ALTER TABLE `tweet_comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `tweet_comments` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `direct_messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
ALTER TABLE `direct_messages` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);
ALTER TABLE `bookmarks` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `bookmarks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `reply_comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `reply_comments` ADD FOREIGN KEY (`comment_id`) REFERENCES `tweet_comments` (`id`);
ALTER TABLE `role_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `role_users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
ALTER TABLE `retweets` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `retweets` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `comment_likes` ADD FOREIGN KEY (`comment_id`) REFERENCES `tweet_comments` (`id`);
ALTER TABLE `comment_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
  ALTER TABLE `get_support` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `tweet_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `tweet_likes` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `message_medias` ADD FOREIGN KEY (`message_id`) REFERENCES `direct_messages` (`id`);
ALTER TABLE `hashtag_tweet` ADD FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag_lists` (`id`);
ALTER TABLE `hashtag_tweet` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `followers` ADD FOREIGN KEY (`following_id`) REFERENCES `users` (`id`);
ALTER TABLE `followers` ADD FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`);
ALTER TABLE `medias` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `notifications` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `notifications` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `tweets` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);










--add into permission table
INSERT INTO `temp_twitter`.`permissions` (`id`, `permission_name`) VALUES ('1', '/admin/adminPannel');
INSERT INTO `temp_twitter`.`permissions` (`id`, `permission_name`) VALUES ('2', '/home');
INSERT INTO `temp_twitter`.`permissions` (`id`, `permission_name`) VALUES ('3', '/messages');
INSERT INTO `temp_twitter`.`permissions` (`id`, `permission_name`) VALUES ('4', '/bookmark');
INSERT INTO `temp_twitter`.`permissions` (`id`, `permission_name`) VALUES ('6', '/explore');
INSERT INTO `temp_twitter`.`permissions` (`id`, `permission_name`) VALUES ('7', '/profile');
INSERT INTO `temp_twitter`.`permissions` (`id`, `permission_name`) VALUES ('8', '/admin/verify');
INSERT INTO `temp_twitter`.`permissions` (`id`, `permission_name`) VALUES ('9', '/notifications');






--add into role_permisssion table
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('1', '2');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('1', '3');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('1', '4');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('1', '6');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('1', '7');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('2', '8');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('2', '2');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('2', '3');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('2', '4');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('2', '6');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ('2', '7');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ( '1', '9');
INSERT INTO `temp_twitter`.`role_permissions` (`role_id`, `permission_id`) VALUES ( '2', '9');






