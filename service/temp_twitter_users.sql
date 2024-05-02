-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: temp_twitter
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  KEY `state_id` (`state_id`),
  KEY `city_id` (`city_id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'jilpatel8244','pateljil8244@gmail.com','2abb7eed1e50225bda104ce4fd7bbb1b','Jil Patel','2002-12-13','1713798186884-IMG_20220801_170540.jpg','1713798186884-Untitled.jpeg','',NULL,NULL,NULL,'Hfl9YqENMXpd','wAhH',1,NULL,NULL,'2024-04-22 13:32:09','2024-04-22 15:03:06',NULL,NULL,NULL,1),(18,'shivam43','shivaml@gmail.com','6e9d86d8992366d530c0d108449b655d','Shivam Limbachiya','2002-12-13','1713798582012-Screenshot from 2024-04-22 20-39-17.png','1713798582011-F4N3HrtbIAAM4i8.jpeg','',NULL,NULL,NULL,'oVJ0hOGzgOYH','UvCO',1,NULL,NULL,'2024-04-22 13:33:33','2024-04-29 03:59:37',NULL,NULL,NULL,1),(19,'chetu123','parmeshvarparmar@gmail.com','91682a00c75d97006b9a3a5067fc3b5e','Parmeshvar Parmar','2002-12-13',NULL,NULL,NULL,NULL,NULL,NULL,'CV0kyPc9ovf3','kz1h',1,NULL,NULL,'2024-04-22 13:35:32','2024-04-22 13:35:39',NULL,NULL,NULL,1),(20,'abhi5544','abhishek@gmail.com','c5d13f144bb30be20b0df998a4a9c6ca','Abhishek Verma','2002-12-13','1713798962145-Screenshot from 2024-04-22 20-45-34.png','1713798962143-pexels-pixabay-60597.jpg','',NULL,NULL,NULL,'jJ7WiJVACErI','HBhx',1,NULL,NULL,'2024-04-22 13:37:44','2024-04-22 15:16:02',NULL,NULL,NULL,1),(21,'rijvan456','rijvanprofessor@gmail.com','e44e613b704ed2cee8604fadd1945899','Rijvan Juneja','2002-12-12','1713798852050-Screenshot from 2024-04-22 20-43-44.png','1714219398169-dhoni2.jpeg','',NULL,NULL,NULL,'PRlhwDTBiLT4','gP0h',1,NULL,NULL,'2024-04-22 13:39:19','2024-04-27 12:03:18',NULL,NULL,NULL,1),(22,'mihir8999','mihir55@gmail.com','0dec074594d82a288691607608e144bf','Mihir Rajpopat','2002-12-13',NULL,NULL,NULL,NULL,NULL,NULL,'FlJkHkmsWNIZ','fxPR',1,NULL,NULL,'2024-04-22 13:40:40','2024-04-22 13:40:45',NULL,NULL,NULL,1),(23,'nikki456','nikita47@gmail.com','c94915608f19eb3d81e58f2c76e43756','Nikita','2002-12-13',NULL,NULL,NULL,NULL,NULL,NULL,'nDwcC1Fh9RlS','eAUU',1,NULL,NULL,'2024-04-22 13:41:36','2024-04-22 13:41:41',NULL,NULL,NULL,1),(24,'sonu22','sanket55@gmail.com','66e61ce2a204558b918329828fa67f5d','Sanketkumar','2000-12-13',NULL,NULL,NULL,NULL,NULL,NULL,'twAyjDkYw6mt','DDqM',1,NULL,NULL,'2024-04-22 13:43:03','2024-04-22 13:43:28',NULL,NULL,NULL,1),(25,'sanket7','sanketlakhani47@gmail.com','a2212c62f0309bc5be3cd9cf950643e0','Sanket Lakhani','2002-12-13','1713798400814-Screenshot from 2024-04-22 20-36-20.png','1713798400814-beautiful-waterfall-flowers-water-nature-waterfall-hd-wallpaper-ai-generated-free-photo.jpg','',NULL,NULL,NULL,'FNn8phbGesG8','QwqS',1,NULL,NULL,'2024-04-22 13:44:20','2024-04-22 15:06:40',NULL,NULL,NULL,1),(26,'chintan159','chintan123@gmail.com','a7bf6eaec192f6753f90a9da31e62558','Chintan Gor','2002-12-13',NULL,NULL,NULL,NULL,NULL,NULL,'7mgdj9rDr6i3','w38z',1,NULL,NULL,'2024-04-22 13:46:00','2024-04-22 13:46:05',NULL,NULL,NULL,1),(27,'jay99','jaykishan49@gmail.com','a8798d20aad334401757e8293a145c50','Jaykishan','2002-12-13',NULL,NULL,NULL,NULL,NULL,NULL,'RKtVSSBUAPdu','ntk5',1,NULL,NULL,'2024-04-22 13:46:58','2024-04-22 13:47:03',NULL,NULL,NULL,1),(28,'sidh45','sidharth45@gmail.com','c1f4e9757c031d84447dd7bc8513016f','Sidharth','2002-12-13',NULL,NULL,NULL,NULL,NULL,NULL,'O0542Ts7eEIm','6yi3',1,NULL,NULL,'2024-04-22 13:51:39','2024-04-22 13:51:46',NULL,NULL,NULL,1),(29,'msd7','mahi7@gmail.com','34e199d1af9d332c15306d61de51f7f5','Mahi','1985-12-13','1713854672074-dhoni2.jpeg','1713854672073-dhoni3.jpeg','',NULL,NULL,NULL,'DjBuIIPe0t83','f2Vn',1,NULL,NULL,'2024-04-23 06:42:57','2024-04-23 06:44:32',NULL,NULL,NULL,1),(30,'tushar456','tusharrupani456@gmail.com','37c94d5e0d080dc25e5394956c0788c5','Tushar Rupani','2002-12-13',NULL,NULL,NULL,NULL,NULL,NULL,'Vh6SIxdsNoTL','IwBq',1,NULL,NULL,'2024-04-29 13:42:22','2024-04-29 13:42:29',NULL,NULL,NULL,1),(31,'harshsangvi','harshsangvi@gmail.com','19f5b6708b6545e25032804b31c431a4','harsh sangvi','1975-12-12',NULL,NULL,NULL,NULL,NULL,NULL,'91O2ktsjRPja','ahoF',1,NULL,NULL,'2024-05-01 14:43:23','2024-05-01 14:43:29',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-01 21:26:39
