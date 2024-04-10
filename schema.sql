create database temp_twitter;
use temp_twitter;
drop database temp_twitter; 

CREATE TABLE `roles` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `permissions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `permission_name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);

CREATE TABLE `role_permissions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL
);
ALTER TABLE `role_permissions` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
ALTER TABLE `role_permissions` ADD FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

CREATE TABLE `states` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `country_id` int NOT NULL
);

CREATE TABLE `cities` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state_id` int NOT NULL
);

CREATE TABLE `countries` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

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
  `country_id` INT,
  `state_id` INT,
  `city_id` INT,
  `activation_code` VARCHAR(100),
  `salt` VARCHAR(45),
  `is_active` tinyint,
  `role_id` INT,
  `is_private` tinyint,
  `is_varified` tinyint,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (`state_id`) REFERENCES `states` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

CREATE TABLE `role_users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `user_id` INT NOT NULL
);
ALTER TABLE `role_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `role_users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

CREATE TABLE `logs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `is_successfull` tinyint,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
ALTER TABLE `logs` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `followers` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `following_id` INT,
  `follower_id` INT,
  `is_blocked` tinyint,
  `current_status` tinyint -- follow, unfollow
);
ALTER TABLE `followers` ADD FOREIGN KEY (`following_id`) REFERENCES `users` (`id`);
ALTER TABLE `followers` ADD FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`);

CREATE TABLE `tweets` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `is_drafted` boolean,
  `is_posted` boolean,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `tweets` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `medias` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `tweet_id` INT NOT NULL,
  `media_url` VARCHAR(255),
  `media_type` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `medias` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);

CREATE TABLE `tweet_comments` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `tweet_id` INT,
  `content` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `tweet_comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `tweet_comments` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);

CREATE TABLE `reply_comments` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `comment_id` INT,
  `content` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `reply_comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `reply_comments` ADD FOREIGN KEY (`comment_id`) REFERENCES `tweet_comments` (`id`);

CREATE TABLE `tweet_likes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `tweet_id` INT,
  `status` boolean,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
ALTER TABLE `tweet_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `tweet_likes` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);

CREATE TABLE `comment_likes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `comment_id` INT,
  `user_id` INT,
  `status` boolean,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
ALTER TABLE `comment_likes` ADD FOREIGN KEY (`comment_id`) REFERENCES `tweet_comments` (`id`);
ALTER TABLE `comment_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `bookmarks` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `tweet_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `status` boolean,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
ALTER TABLE `bookmarks` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `bookmarks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `notifications` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tweet_id` INT NOT NULL,
  `type` VARCHAR(255),
  `related_user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
ALTER TABLE `notifications` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `notifications` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `hashtag_lists` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `hashtag_name` VARCHAR(50),
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `hashtag_tweet` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `hashtag_id` INT NOT NULL,
  `tweet_id` INT NOT NULL,
  `status` tinyint,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
ALTER TABLE `hashtag_tweet` ADD FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag_lists` (`id`);
ALTER TABLE `hashtag_tweet` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);

CREATE TABLE `retweets` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `tweet_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `retweet_message` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `retweets` ADD FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`);
ALTER TABLE `retweets` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE TABLE `direct_messages` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `content` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP on update CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP
);
ALTER TABLE `direct_messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);
ALTER TABLE `direct_messages` ADD FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);



insert into countries (name) values ('india');
insert into states (name, country_id) values ('gujarat', 1);
insert into cities (name, state_id) values ('surat', 1);
insert into roles (role_name) values ('user');  
  