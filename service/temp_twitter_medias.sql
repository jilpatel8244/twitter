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
-- Table structure for table `medias`
--

DROP TABLE IF EXISTS `medias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medias`
--

LOCK TABLES `medias` WRITE;
/*!40000 ALTER TABLE `medias` DISABLE KEYS */;
INSERT INTO `medias` VALUES (1,31,'1713794167144-pexels-pixabay-60597.jpg','image/jpeg','2024-04-22 13:56:07',NULL,NULL),(2,32,'1713794180559-beautiful-waterfall-flowers-water-nature-waterfall-hd-wallpaper-ai-generated-free-photo.jpg','image/jpeg','2024-04-22 13:56:20',NULL,NULL),(3,33,'1713794235428-Untitled.jpeg','image/jpeg','2024-04-22 13:57:15',NULL,NULL),(4,34,'1713794533583-IMG_20220801_170540.jpg','image/jpeg','2024-04-22 14:02:13',NULL,NULL),(5,36,'1713794611999-photo_1.jpg','image/jpeg','2024-04-22 14:03:32',NULL,NULL),(6,37,'1713794859584-123.jpeg','image/jpeg','2024-04-22 14:07:39',NULL,NULL),(7,38,'1713794881157-images.jpeg','image/jpeg','2024-04-22 14:08:01',NULL,NULL),(8,39,'1713798511088-F4N3HrtbIAAM4i8.jpeg','image/jpeg','2024-04-22 15:08:31',NULL,NULL),(9,43,'1713853989941-car1.jpeg','image/jpeg','2024-04-23 06:33:09',NULL,NULL),(10,44,'1713854194149-cofi.jpeg','image/jpeg','2024-04-23 06:36:34',NULL,NULL),(11,45,'1713854290181-wallpaper.jpeg','image/jpeg','2024-04-23 06:38:10',NULL,NULL),(12,46,'1713854384374-F4N3HrtbIAAM4i8.jpeg','image/jpeg','2024-04-23 06:39:44',NULL,NULL),(13,47,'1713854494893-dhoni.jpeg','image/jpeg','2024-04-23 06:41:34',NULL,NULL),(14,48,'1713854732999-ipl.jpeg','image/jpeg','2024-04-23 06:45:33',NULL,NULL),(15,49,'1713863640906-Screenshot from 2024-04-22 20-43-44.png','image/png','2024-04-23 09:14:00',NULL,NULL),(16,50,'1713866792894-images.jpeg','image/jpeg','2024-04-23 10:06:32',NULL,NULL),(17,52,'1713944093413-Screenshot from 2024-04-22 20-43-44.png','image/png','2024-04-24 07:34:53',NULL,NULL),(18,54,'1714124227026-bellingham-real-madrid.gif','image/gif','2024-04-26 09:37:07',NULL,NULL),(19,57,'1714396888098-IMG_20220801_170540.jpg','image/jpeg','2024-04-29 13:21:28',NULL,NULL),(20,58,'1714399504870-photo_1.jpg','image/jpeg','2024-04-29 14:05:04',NULL,NULL),(22,60,'1714449614772-123.jpeg','image/jpeg','2024-04-30 04:00:14',NULL,NULL),(23,61,'1714541241613-addams-family.gif','image/gif','2024-05-01 05:27:21',NULL,NULL),(24,69,'1714567004513-addams-family.gif','image/gif','2024-05-01 12:36:44',NULL,NULL);
/*!40000 ALTER TABLE `medias` ENABLE KEYS */;
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
