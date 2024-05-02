create database temp_twitter;
use temp_twitter;

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `profile_img_url` varchar(255) DEFAULT NULL,
  `cover_img_url` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `activation_code` varchar(100) DEFAULT NULL,
  `salt` varchar(45) DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `is_varified` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `prof_desc` varchar(255) DEFAULT NULL,
  `is_private` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `is_successfull` tinyint DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `tweets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `is_drafted` tinyint DEFAULT NULL,
  `is_posted` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_ristricted` tinyint DEFAULT '0',
  `retweet_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tweets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `retweets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tweet_id` int NOT NULL,
  `user_id` int NOT NULL,
  `retweet_message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tweet_id` (`tweet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `retweets_ibfk_1` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`),
  CONSTRAINT `retweets_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

alter table tweets add constraint foreign key (retweet_id) references retweets(id);

CREATE TABLE `bookmarks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tweet_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tweet_id` (`tweet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`),
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `direct_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `content` text,
  `is_read` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `direct_messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `direct_messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=336 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `message_medias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message_id` int NOT NULL,
  `url` text,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `message_id` (`message_id`),
  CONSTRAINT `message_medias_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `direct_messages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `medias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tweet_id` int NOT NULL,
  `media_url` varchar(255) DEFAULT NULL,
  `media_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tweet_id` (`tweet_id`),
  CONSTRAINT `medias_ibfk_1` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `verification_requests` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `request` tinyint DEFAULT '0',
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `verification_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `following_id` int DEFAULT NULL,
  `follower_id` int DEFAULT NULL,
  `is_blocked` tinyint DEFAULT NULL,
  `current_status` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `following_id` (`following_id`),
  KEY `follower_id` (`follower_id`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `get_support` (
  `id` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT (NULL),
  `deleted_at` timestamp NULL DEFAULT (NULL),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `get_support_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tweet_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tweet_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `tweet_id` (`tweet_id`),
  CONSTRAINT `tweet_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tweet_comments_ibfk_2` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comment_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `comment_id` (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `tweet_comments` (`id`),
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `hashtag_lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hashtag_name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hashtag_tweet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hashtag_id` int NOT NULL,
  `tweet_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hashtag_id` (`hashtag_id`),
  CONSTRAINT `hashtag_tweet_ibfk_1` FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag_lists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `reply_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `comment_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `reply_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reply_comments_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `tweet_comments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `support_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `tickit_id` varchar(20) NOT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tickit_id` (`tickit_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `support_messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `support_messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `support_messages_ibfk_3` FOREIGN KEY (`tickit_id`) REFERENCES `get_support` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tweet_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tweet_id` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `tweet_id` (`tweet_id`),
  CONSTRAINT `tweet_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tweet_likes_ibfk_2` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `role_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `role_users_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tweet_id` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `related_user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now()),
  `is_read` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `tweet_id` (`tweet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`tweet_id`) REFERENCES `tweets` (`id`),
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=597 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- koene kae bhool lage to kejo
-- thank you for co-operation and sorry for delay

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


--roles table 
INSERT INTO `temp_twitter`.`roles` (`id`, `role_name`) VALUES ('1', 'user');
INSERT INTO `temp_twitter`.`roles` (`id`, `role_name`) VALUES ('2', 'verifiedUser');
INSERT INTO `temp_twitter`.`roles` (`id`, `role_name`) VALUES ('3', 'admin');
