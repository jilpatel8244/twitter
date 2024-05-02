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
-- Table structure for table `hashtag_tweet`
--

DROP TABLE IF EXISTS `hashtag_tweet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag_tweet`
--

LOCK TABLES `hashtag_tweet` WRITE;
/*!40000 ALTER TABLE `hashtag_tweet` DISABLE KEYS */;
INSERT INTO `hashtag_tweet` VALUES (1,2,55,1,'2024-04-27 13:55:40'),(2,3,61,1,'2024-05-01 05:27:21'),(3,4,62,1,'2024-05-01 07:09:31'),(4,4,63,1,'2024-05-01 07:09:58'),(5,4,64,1,'2024-05-01 07:10:19'),(6,4,65,1,'2024-05-01 07:10:32'),(7,8,66,1,'2024-05-01 07:12:18'),(8,8,67,1,'2024-05-01 07:12:25'),(9,8,68,1,'2024-05-01 07:12:33'),(10,11,69,1,'2024-05-01 12:36:44');
/*!40000 ALTER TABLE `hashtag_tweet` ENABLE KEYS */;
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
