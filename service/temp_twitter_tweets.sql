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
-- Table structure for table `tweets`
--

DROP TABLE IF EXISTS `tweets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tweets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `is_drafted` tinyint(1) DEFAULT NULL,
  `is_posted` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_ristricted` tinyint DEFAULT '0',
  `retweet_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `retweet_id` (`retweet_id`),
  CONSTRAINT `tweets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tweets_ibfk_2` FOREIGN KEY (`retweet_id`) REFERENCES `retweets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweets`
--

LOCK TABLES `tweets` WRITE;
/*!40000 ALTER TABLE `tweets` DISABLE KEYS */;
INSERT INTO `tweets` VALUES (29,25,'first tweet\r\n',0,1,'2024-04-22 13:53:42',NULL,NULL,0,NULL),(30,19,'second tweet\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry.',0,1,'2024-04-22 13:54:30',NULL,NULL,0,NULL),(31,25,'nice flower',0,1,'2024-04-22 13:56:07',NULL,NULL,0,NULL),(32,25,'nice view',0,1,'2024-04-22 13:56:20',NULL,NULL,0,NULL),(33,25,'radhe krishna\r\n',0,1,'2024-04-22 13:57:15',NULL,NULL,0,NULL),(34,17,'life changes when you think good for others\r\nthink good be possitive',0,1,'2024-04-22 14:02:13',NULL,NULL,0,NULL),(35,17,'hey there i am using twitter',0,1,'2024-04-22 14:03:06',NULL,NULL,0,NULL),(36,17,'old memories',0,1,'2024-04-22 14:03:32',NULL,NULL,0,NULL),(37,26,'new recipe tried',0,1,'2024-04-22 14:07:39',NULL,NULL,0,NULL),(38,26,'fun at imagica',0,1,'2024-04-22 14:08:01',NULL,NULL,0,NULL),(39,18,'proud ',0,1,'2024-04-22 15:08:31',NULL,NULL,0,NULL),(40,20,'hey everyone good morning',0,1,'2024-04-23 04:15:56','2024-04-23 04:36:04',NULL,0,NULL),(41,21,'if you think good for others...then you are a good person',0,1,'2024-04-23 04:57:00','2024-04-23 06:22:28',NULL,0,NULL),(42,17,'@rijvan456 congratulations on your marriage...live long and happy life\r\n',0,1,'2024-04-23 06:24:05',NULL,NULL,0,NULL),(43,17,'new one added\r\n',0,1,'2024-04-23 06:33:09',NULL,NULL,0,NULL),(44,17,'yummy\r\n',0,1,'2024-04-23 06:36:34',NULL,NULL,0,NULL),(45,21,'nice view',0,1,'2024-04-23 06:38:10',NULL,NULL,0,NULL),(46,17,'India on the moon\r\n',0,1,'2024-04-23 06:39:44',NULL,NULL,0,NULL),(47,17,'Dhoni finishes off in style\r\n',0,1,'2024-04-23 06:41:34',NULL,NULL,0,NULL),(48,29,'ready for ipl final 2024',0,1,'2024-04-23 06:45:33',NULL,NULL,0,NULL),(49,21,'GOOD',0,1,'2024-04-23 09:14:00',NULL,NULL,0,NULL),(50,21,'',0,1,'2024-04-23 10:06:32',NULL,NULL,0,NULL),(51,17,'hfghfghhsfghghjksfglg srikglsklgnsflk smtnjktlmgl;mgik;jgmvkmfglk\r\n',0,1,'2024-04-23 11:00:38',NULL,NULL,0,NULL),(52,17,'',1,0,'2024-04-24 07:34:53',NULL,NULL,0,NULL),(53,17,'?',0,1,'2024-04-26 09:25:55',NULL,NULL,0,NULL),(54,17,'',0,1,'2024-04-26 09:37:07',NULL,NULL,0,NULL),(55,17,'#ipl yehhhh\r\n',0,1,'2024-04-27 13:55:40',NULL,NULL,0,NULL),(56,17,'fgjccgch',0,1,'2024-04-29 04:22:19',NULL,NULL,0,NULL),(57,17,'',0,1,'2024-04-29 13:21:28',NULL,NULL,0,NULL),(58,17,'',0,1,'2024-04-29 14:05:04',NULL,NULL,0,NULL),(59,20,'hey this is abhi here\r\n\r\n',0,1,'2024-04-30 03:53:55',NULL,NULL,0,NULL),(60,20,'',0,1,'2024-04-30 04:00:14',NULL,NULL,0,NULL),(61,20,'new movie anabel released #anabel\r\n',0,1,'2024-05-01 05:27:21',NULL,NULL,0,NULL),(62,17,'#rijubhai',0,1,'2024-05-01 07:09:31',NULL,NULL,0,NULL),(63,17,'#rijubhai\r\n',0,1,'2024-05-01 07:09:58',NULL,NULL,0,NULL),(64,21,'#rijubhai',0,1,'2024-05-01 07:10:19',NULL,NULL,0,NULL),(65,20,'#rijubhai',0,1,'2024-05-01 07:10:32',NULL,NULL,0,NULL),(66,20,'#ipl2024',0,1,'2024-05-01 07:12:18',NULL,NULL,0,NULL),(67,21,'#ipl2024',0,1,'2024-05-01 07:12:25',NULL,NULL,0,NULL),(68,17,'#ipl2024',0,1,'2024-05-01 07:12:33',NULL,NULL,0,NULL),(69,17,'#Happy Wensday\r\n',0,1,'2024-05-01 12:36:44',NULL,NULL,0,NULL),(70,19,'hey there this to check 123\r\n',0,1,'2024-05-01 14:14:06',NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `tweets` ENABLE KEYS */;
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
