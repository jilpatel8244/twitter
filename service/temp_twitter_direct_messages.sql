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
-- Table structure for table `direct_messages`
--

DROP TABLE IF EXISTS `direct_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direct_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `content` text,
  `is_read` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `direct_messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `direct_messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=336 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direct_messages`
--

LOCK TABLES `direct_messages` WRITE;
/*!40000 ALTER TABLE `direct_messages` DISABLE KEYS */;
INSERT INTO `direct_messages` VALUES (1,21,20,'text','hi',1,'2024-04-29 10:15:59','2024-04-29 10:19:51',NULL),(2,21,20,'text','hi',1,'2024-04-29 10:16:40','2024-04-29 10:19:51',NULL),(3,21,20,'text','hi',1,'2024-04-29 10:17:22','2024-04-29 10:19:51',NULL),(4,21,20,'text','hi',1,'2024-04-29 10:18:25','2024-04-29 10:19:51',NULL),(5,21,20,'media','',1,'2024-04-29 10:18:37','2024-04-29 10:19:51',NULL),(6,20,21,'text','hi',1,'2024-04-29 10:20:04','2024-04-29 10:20:11',NULL),(7,21,20,'text','hi',1,'2024-04-29 10:20:15','2024-04-29 10:23:30',NULL),(8,20,21,'text','hey',1,'2024-04-29 10:23:34','2024-04-29 10:23:47',NULL),(9,21,20,'text','hello',1,'2024-04-29 10:23:51','2024-04-29 10:23:51',NULL),(10,20,21,'text','hello whts time there\'',1,'2024-04-29 10:24:01','2024-04-29 10:24:01',NULL),(11,21,20,'text','hello testing number 1',1,'2024-04-29 10:24:04','2024-04-29 10:24:04',NULL),(12,21,20,'media','',1,'2024-04-29 10:24:19','2024-04-29 10:24:19',NULL),(13,20,21,'media','',1,'2024-04-29 10:24:35','2024-04-29 10:24:35',NULL),(14,21,20,'media-text','hi',1,'2024-04-29 10:25:04','2024-04-29 10:25:04',NULL),(15,20,21,'media-text','hi',1,'2024-04-29 10:25:58','2024-04-29 10:25:58',NULL),(16,21,20,'text','hi',1,'2024-04-29 10:36:58','2024-04-29 10:37:00',NULL),(17,20,21,'text','hey',1,'2024-04-29 10:37:03','2024-04-29 10:37:03',NULL),(18,21,20,'media-text','what is this',1,'2024-04-29 10:37:22','2024-04-29 10:37:22',NULL),(19,21,20,'media','',1,'2024-04-29 10:42:04','2024-04-29 10:42:04',NULL),(20,21,20,'media','',1,'2024-04-29 10:42:08','2024-04-29 10:42:08',NULL),(21,21,20,'text','hey',1,'2024-04-29 10:43:05','2024-04-29 10:43:05',NULL),(22,21,20,'text','whtas up',1,'2024-04-29 10:43:12','2024-04-29 10:43:12',NULL),(23,21,20,'media','',1,'2024-04-29 10:43:17','2024-04-29 10:43:17',NULL),(24,21,20,'media-text','match started',1,'2024-04-29 10:43:27','2024-04-29 10:43:27',NULL),(25,21,20,'media-text','match started',1,'2024-04-29 10:43:40','2024-04-29 10:43:40',NULL),(26,20,21,'text','hi',1,'2024-04-29 10:45:17','2024-04-29 10:45:18',NULL),(27,21,20,'text','hey',1,'2024-04-29 10:45:21','2024-04-29 10:45:21',NULL),(28,20,21,'text','hello',1,'2024-04-29 10:45:25','2024-04-29 10:45:25',NULL),(29,21,20,'text','testing chalu',1,'2024-04-29 10:45:32','2024-04-29 10:45:32',NULL),(30,20,21,'media','',1,'2024-04-29 10:45:40','2024-04-29 10:45:40',NULL),(31,21,20,'media','',1,'2024-04-29 10:45:48','2024-04-29 10:45:48',NULL),(32,20,21,'media-text','do you know who is he..?',1,'2024-04-29 10:46:08','2024-04-29 10:46:08',NULL),(33,21,17,'text','http://localhost:3000/get_comments/56',1,'2024-04-29 11:00:25','2024-04-29 11:34:18',NULL),(34,21,20,'text','hi',1,'2024-04-29 11:04:03','2024-04-29 11:04:03',NULL),(35,20,21,'text','hello',1,'2024-04-29 11:04:07','2024-04-29 11:04:07',NULL),(36,21,20,'media','',1,'2024-04-29 11:04:12','2024-04-29 11:04:12',NULL),(37,20,21,'media','',1,'2024-04-29 11:04:16','2024-04-29 11:04:16',NULL),(38,20,21,'media-text','hey',1,'2024-04-29 11:04:21','2024-04-29 11:04:21',NULL),(39,21,20,'text','who is he',1,'2024-04-29 11:04:31','2024-04-29 11:04:31',NULL),(40,21,18,'text','http://localhost:3000/get_comments/56',1,'2024-04-29 11:04:40','2024-04-30 10:38:39',NULL),(41,20,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:30:09','2024-04-29 11:31:02',NULL),(42,17,20,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:31:20','2024-04-29 11:32:15',NULL),(43,17,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:34:15','2024-04-29 11:37:49',NULL),(44,17,29,'sharedTweet','http://localhost:3000/get_comments/56',0,'2024-04-29 11:36:42',NULL,NULL),(45,17,29,'sharedTweet','http://localhost:3000/get_comments/54',0,'2024-04-29 11:37:26',NULL,NULL),(46,17,21,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:37:42','2024-04-29 11:37:49',NULL),(47,21,17,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:38:10','2024-04-29 11:38:14',NULL),(48,17,20,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:38:30','2024-04-29 11:38:51',NULL),(49,20,18,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:39:47','2024-04-30 10:38:40',NULL),(50,21,20,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:40:18','2024-04-29 11:40:57',NULL),(51,21,17,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:40:18','2024-04-29 11:40:34',NULL),(52,20,18,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:42:04','2024-04-30 10:38:40',NULL),(53,17,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 11:42:37','2024-04-29 11:42:41',NULL),(54,21,17,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:43:12','2024-04-29 11:54:19',NULL),(55,21,20,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:43:12','2024-04-29 11:43:26',NULL),(56,21,18,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:43:12','2024-04-30 10:38:39',NULL),(57,17,20,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 11:44:04','2024-04-29 11:44:11',NULL),(58,21,20,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:45:35','2024-04-29 11:45:42',NULL),(59,20,17,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:55:12','2024-04-29 11:55:28',NULL),(60,20,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 11:55:12','2024-04-29 11:55:30',NULL),(61,17,20,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:56:02','2024-04-29 11:56:34',NULL),(62,17,21,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:56:02','2024-04-29 11:56:41',NULL),(63,17,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 11:57:45','2024-04-29 11:58:40',NULL),(64,17,20,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 11:57:45','2024-04-29 11:58:36',NULL),(65,17,20,'sharedTweet','http://localhost:3000/get_comments/54',1,'2024-04-29 11:59:01','2024-04-29 12:00:17',NULL),(66,17,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:00:39','2024-04-29 12:00:48',NULL),(67,17,20,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:01:53','2024-04-29 12:03:13',NULL),(68,17,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:01:53','2024-04-29 12:03:26',NULL),(69,17,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:02:11','2024-04-29 12:03:26',NULL),(70,17,20,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:02:11','2024-04-29 12:03:13',NULL),(71,21,18,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:05:31','2024-04-30 10:38:39',NULL),(72,20,17,'text','hello',1,'2024-04-29 12:07:02','2024-04-29 12:07:17',NULL),(73,20,17,'text','hi',1,'2024-04-29 12:07:52','2024-04-29 12:08:01',NULL),(74,17,20,'text','hi',1,'2024-04-29 12:08:10','2024-04-29 12:08:10',NULL),(75,17,29,'text','hey',0,'2024-04-29 12:09:50',NULL,NULL),(76,17,20,'text','hi',1,'2024-04-29 12:10:39','2024-04-29 12:10:39',NULL),(77,20,17,'text','ghello',1,'2024-04-29 12:12:02','2024-04-29 12:12:02',NULL),(78,17,20,'text','hi',1,'2024-04-29 12:12:14','2024-04-29 12:12:14',NULL),(79,20,17,'text','hi',1,'2024-04-29 12:12:18','2024-04-29 12:12:18',NULL),(80,17,20,'text','hi',1,'2024-04-29 12:12:43','2024-04-29 12:12:43',NULL),(81,20,17,'text','hi',1,'2024-04-29 12:12:45','2024-04-29 12:12:45',NULL),(82,21,20,'text','hi',1,'2024-04-29 12:18:02','2024-04-29 12:23:52',NULL),(83,20,17,'sharedTweet','http://192.168.22.62:3000/get_comments/54',1,'2024-04-29 12:23:45','2024-04-29 12:26:28',NULL),(84,21,17,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:27:38','2024-04-29 12:27:53',NULL),(85,21,20,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:27:38','2024-04-29 12:31:58',NULL),(86,20,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:28:05','2024-04-29 12:28:13',NULL),(87,20,17,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:28:05','2024-04-29 12:32:29',NULL),(88,20,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:28:22','2024-04-29 12:28:47',NULL),(89,20,17,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:28:22','2024-04-29 12:32:29',NULL),(90,20,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:28:55','2024-04-29 12:29:00',NULL),(91,20,17,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:28:55','2024-04-29 12:32:29',NULL),(92,17,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 12:32:37','2024-04-29 12:32:43',NULL),(93,17,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:33:33','2024-04-29 12:36:40',NULL),(94,17,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:34:17','2024-04-29 12:36:40',NULL),(95,17,20,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:34:17','2024-04-29 12:36:36',NULL),(96,21,20,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:35:02','2024-04-29 12:36:37',NULL),(97,21,17,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:35:02','2024-04-29 12:36:44',NULL),(98,17,20,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:35:52','2024-04-29 12:36:36',NULL),(99,17,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:35:52','2024-04-29 12:36:40',NULL),(100,17,18,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:35:52','2024-04-30 10:38:38',NULL),(101,17,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:37:07','2024-04-29 13:01:28',NULL),(102,17,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 12:37:41','2024-04-29 13:01:28',NULL),(103,17,20,'text','http://localhost:3000/get_comments/55',1,'2024-04-29 12:45:30','2024-04-29 13:01:34',NULL),(104,17,20,'text','hey',1,'2024-04-29 13:01:25','2024-04-29 13:01:34',NULL),(105,20,17,'text','hi',1,'2024-04-29 13:01:36','2024-04-29 13:01:36',NULL),(106,17,20,'text','whats app',1,'2024-04-29 13:01:42','2024-04-29 13:01:42',NULL),(107,20,17,'text','no twitter',1,'2024-04-29 13:01:49','2024-04-29 13:01:49',NULL),(108,17,20,'media','',1,'2024-04-29 13:01:56','2024-04-29 13:01:56',NULL),(109,17,20,'media-text','kevo photo che?',1,'2024-04-29 13:02:25','2024-04-29 13:02:25',NULL),(110,20,17,'text','nice',1,'2024-04-29 13:02:31','2024-04-29 13:02:31',NULL),(111,20,17,'media-text','this gif?',1,'2024-04-29 13:03:00','2024-04-29 13:03:00',NULL),(112,17,20,'text','okok',1,'2024-04-29 13:03:05','2024-04-29 13:03:05',NULL),(113,20,17,'text','hey',1,'2024-04-29 13:05:08','2024-04-29 13:05:09',NULL),(114,17,20,'text','good',1,'2024-04-29 13:05:20','2024-04-29 13:05:20',NULL),(115,17,20,'text','hey',1,'2024-04-29 13:10:05','2024-04-29 13:10:08',NULL),(116,20,17,'text','hi',1,'2024-04-29 13:10:10','2024-04-29 13:10:10',NULL),(117,17,20,'text','hello',1,'2024-04-29 13:10:21','2024-04-29 13:10:21',NULL),(118,20,17,'text','hi',1,'2024-04-29 13:11:02','2024-04-29 13:11:02',NULL),(119,17,20,'text','hey',1,'2024-04-29 13:11:08','2024-04-29 13:11:08',NULL),(120,17,20,'text','hey',1,'2024-04-29 13:12:02','2024-04-29 13:12:02',NULL),(121,20,17,'text','hi',1,'2024-04-29 13:12:12','2024-04-29 13:12:12',NULL),(122,17,20,'text','bol',1,'2024-04-29 13:12:18','2024-04-29 13:12:18',NULL),(123,20,17,'text','su kare',1,'2024-04-29 13:12:29','2024-04-29 13:12:29',NULL),(124,17,20,'text','hi',1,'2024-04-29 13:13:02','2024-04-29 13:13:02',NULL),(125,20,17,'text','bol',1,'2024-04-29 13:13:06','2024-04-29 13:13:06',NULL),(126,17,20,'text','kane nae',1,'2024-04-29 13:13:12','2024-04-29 13:13:12',NULL),(127,20,17,'text','ha to su nakhara kare che',1,'2024-04-29 13:13:35','2024-04-29 13:13:35',NULL),(128,20,17,'text','mar khaesh',1,'2024-04-29 13:13:40','2024-04-29 13:13:40',NULL),(129,20,17,'text','hey',1,'2024-04-29 13:14:37','2024-04-29 13:14:37',NULL),(130,17,20,'text','bol',1,'2024-04-29 13:14:48','2024-04-29 13:14:48',NULL),(131,20,17,'text','kae nae',1,'2024-04-29 13:14:54','2024-04-29 13:14:54',NULL),(132,17,19,'sharedTweet','http://localhost:3000/get_comments/58',1,'2024-04-29 14:33:21','2024-05-01 14:13:39',NULL),(133,17,26,'sharedTweet','http://localhost:3000/get_comments/56',0,'2024-04-29 14:48:32',NULL,NULL),(134,20,21,'sharedTweet','http://localhost:3000/get_comments/58',1,'2024-04-29 14:55:34','2024-05-01 04:41:14',NULL),(135,20,21,'sharedTweet','http://localhost:3000/get_comments/57',1,'2024-04-29 14:55:57','2024-05-01 04:41:14',NULL),(136,20,21,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 14:57:43','2024-05-01 04:41:14',NULL),(137,20,18,'sharedTweet','http://localhost:3000/get_comments/56',1,'2024-04-29 14:58:29','2024-04-30 10:38:40',NULL),(138,20,17,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 14:58:37','2024-04-29 14:58:50',NULL),(139,20,17,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 14:58:43','2024-04-29 14:58:50',NULL),(140,20,21,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 14:58:43','2024-05-01 04:41:14',NULL),(141,20,18,'sharedTweet','http://localhost:3000/get_comments/55',1,'2024-04-29 14:58:43','2024-04-30 10:38:40',NULL),(142,17,20,'text','hey',1,'2024-04-30 03:51:16','2024-04-30 03:51:50',NULL),(143,20,17,'text','bol ',1,'2024-04-30 03:51:55','2024-04-30 03:51:55',NULL),(144,17,20,'text','kae nae',1,'2024-04-30 03:52:00','2024-04-30 03:52:00',NULL),(145,20,17,'text','?',1,'2024-04-30 03:52:09','2024-04-30 03:52:09',NULL),(146,17,20,'media','',1,'2024-04-30 03:52:17','2024-04-30 03:52:17',NULL),(147,20,17,'media','',1,'2024-04-30 03:52:29','2024-04-30 03:52:29',NULL),(148,20,17,'media-text','olkhe ane',1,'2024-04-30 03:52:47','2024-04-30 03:52:47',NULL),(149,17,20,'text','has to vadi',1,'2024-04-30 03:52:56','2024-04-30 03:52:56',NULL),(150,17,20,'sharedTweet','http://localhost:3000/get_comments/49',1,'2024-04-30 05:29:49','2024-04-30 05:29:56',NULL),(151,17,20,'sharedTweet','http://localhost:3000/get_comments/49',1,'2024-04-30 05:30:12','2024-04-30 07:01:59',NULL),(152,17,20,'sharedTweet','http://localhost:3000/get_comments/49',1,'2024-04-30 05:30:21','2024-04-30 07:01:59',NULL),(153,17,18,'sharedTweet','http://localhost:3000/get_comments/39',1,'2024-04-30 05:31:05','2024-04-30 10:38:38',NULL),(154,17,18,'sharedTweet','http://localhost:3000/get_comments/59',1,'2024-04-30 05:33:09','2024-04-30 10:38:38',NULL),(155,17,18,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 06:09:14','2024-04-30 10:38:38',NULL),(156,17,18,'sharedTweet','http://localhost:3000/get_comments/39',1,'2024-04-30 06:10:30','2024-04-30 10:38:38',NULL),(157,17,18,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 06:11:48','2024-04-30 10:38:38',NULL),(158,17,21,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 06:13:21','2024-04-30 12:46:43',NULL),(159,17,18,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 06:15:56','2024-04-30 10:38:38',NULL),(160,17,18,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 06:26:47','2024-04-30 10:38:38',NULL),(161,17,18,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 06:43:28','2024-04-30 10:38:38',NULL),(162,20,21,'sharedTweet','http://localhost:3000/get_comments/59',1,'2024-04-30 07:21:24','2024-05-01 04:41:14',NULL),(163,20,18,'sharedTweet','http://localhost:3000/get_comments/59',1,'2024-04-30 07:21:24','2024-04-30 10:38:40',NULL),(164,17,20,'media-text','hi',1,'2024-04-30 08:45:47','2024-04-30 08:51:24',NULL),(165,17,18,'media-text','hi',1,'2024-04-30 08:49:04','2024-04-30 10:38:38',NULL),(166,17,18,'media','',1,'2024-04-30 08:49:28','2024-04-30 10:38:38',NULL),(167,17,18,'text','c',1,'2024-04-30 08:49:34','2024-04-30 10:38:38',NULL),(168,17,18,'media','',1,'2024-04-30 08:50:05','2024-04-30 10:38:38',NULL),(169,17,18,'media','',1,'2024-04-30 08:50:30','2024-04-30 10:38:38',NULL),(170,17,18,'media-text','hey',1,'2024-04-30 08:50:42','2024-04-30 10:38:38',NULL),(171,17,18,'media','',1,'2024-04-30 08:50:51','2024-04-30 10:38:38',NULL),(172,17,18,'text','hi',1,'2024-04-30 08:51:07','2024-04-30 10:38:38',NULL),(173,20,17,'media','',1,'2024-04-30 08:51:33','2024-04-30 08:54:41',NULL),(174,17,25,'media','',0,'2024-04-30 08:59:27',NULL,NULL),(175,17,25,'media','',0,'2024-04-30 08:59:36',NULL,NULL),(176,17,25,'media','',0,'2024-04-30 08:59:39',NULL,NULL),(177,17,25,'media','',0,'2024-04-30 09:00:25',NULL,NULL),(178,17,25,'text','',0,'2024-04-30 09:00:35',NULL,NULL),(179,17,25,'media','',0,'2024-04-30 09:01:50',NULL,NULL),(180,17,25,'media-text','Jil Patel',0,'2024-04-30 09:02:08',NULL,NULL),(181,17,25,'text','Jil Patel',0,'2024-04-30 09:02:24',NULL,NULL),(182,17,25,'media','',0,'2024-04-30 09:03:34',NULL,NULL),(183,17,25,'media-text','Jil',0,'2024-04-30 09:03:41',NULL,NULL),(184,17,25,'text','Jil',0,'2024-04-30 09:03:59',NULL,NULL),(185,17,25,'media-text','whats app',0,'2024-04-30 09:04:35',NULL,NULL),(186,20,17,'text','hey',1,'2024-04-30 10:31:00','2024-04-30 11:51:47',NULL),(187,18,17,'text','hey',1,'2024-04-30 10:38:43','2024-04-30 11:14:15',NULL),(188,17,20,'text','hey',1,'2024-04-30 12:40:31','2024-04-30 12:41:13',NULL),(189,17,20,'text','what are you doing',1,'2024-04-30 12:40:38','2024-04-30 12:41:13',NULL),(190,17,20,'text','hey',1,'2024-04-30 12:44:22','2024-04-30 12:44:43',NULL),(191,21,17,'text','hii',1,'2024-04-30 12:47:21','2024-04-30 12:47:24',NULL),(192,17,21,'text','hello',1,'2024-04-30 12:47:28','2024-04-30 12:47:28',NULL),(193,21,17,'text','?',1,'2024-04-30 12:47:41','2024-04-30 12:47:41',NULL),(194,21,17,'text','hello',1,'2024-04-30 12:48:27','2024-04-30 12:48:27',NULL),(195,17,21,'text','hey',1,'2024-04-30 12:48:32','2024-04-30 12:48:32',NULL),(196,17,21,'text','hi',1,'2024-04-30 12:50:23','2024-04-30 12:50:23',NULL),(197,17,20,'text','sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',1,'2024-04-30 12:53:57','2024-04-30 12:53:57',NULL),(198,17,21,'text','hey',1,'2024-04-30 13:51:24','2024-04-30 13:54:24',NULL),(199,17,21,'text','testing...',1,'2024-04-30 13:51:32','2024-04-30 13:54:24',NULL),(200,17,20,'text','testing...',1,'2024-04-30 13:51:49','2024-04-30 13:51:49',NULL),(201,20,17,'text','hi abhi boli',1,'2024-04-30 13:52:08','2024-04-30 13:52:08',NULL),(202,17,20,'text','km boli',1,'2024-04-30 13:52:20','2024-04-30 13:52:20',NULL),(203,21,17,'text','hii',1,'2024-04-30 13:54:48','2024-04-30 13:54:48',NULL),(204,17,21,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 14:01:34','2024-04-30 14:02:17',NULL),(205,17,19,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 14:01:34','2024-05-01 14:13:39',NULL),(206,17,21,'text','<h1>hello</h1>',1,'2024-04-30 14:02:17','2024-04-30 14:02:17',NULL),(207,17,20,'text','hey',1,'2024-04-30 14:29:13','2024-04-30 14:29:17',NULL),(208,20,17,'text','hi',1,'2024-04-30 14:29:21','2024-04-30 14:29:21',NULL),(209,17,20,'text','hi',1,'2024-04-30 14:31:30','2024-04-30 14:31:30',NULL),(210,17,20,'text','hi',1,'2024-04-30 14:33:46','2024-04-30 14:33:46',NULL),(211,20,17,'text','hi',1,'2024-04-30 14:34:26','2024-04-30 14:34:26',NULL),(212,17,20,'text','hi',1,'2024-04-30 14:37:09','2024-04-30 14:37:09',NULL),(213,20,17,'text','hi',1,'2024-04-30 14:37:18','2024-04-30 14:37:18',NULL),(214,17,20,'text','hi',1,'2024-04-30 14:39:08','2024-04-30 14:39:08',NULL),(215,17,20,'text','hi',1,'2024-04-30 14:39:12','2024-04-30 14:39:12',NULL),(216,20,17,'text','testing',1,'2024-04-30 14:39:21','2024-04-30 14:39:21',NULL),(217,20,17,'text','testing1',1,'2024-04-30 14:39:29','2024-04-30 14:39:30',NULL),(218,17,20,'text','testing 2',1,'2024-04-30 14:39:38','2024-04-30 14:39:38',NULL),(219,20,18,'sharedTweet','http://localhost:3000/get_comments/60',0,'2024-04-30 14:39:53',NULL,NULL),(220,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 14:39:53','2024-04-30 14:40:07',NULL),(221,17,20,'text','hi',1,'2024-04-30 14:44:43','2024-04-30 14:44:51',NULL),(222,20,17,'text','hey',1,'2024-04-30 14:44:54','2024-04-30 14:44:54',NULL),(223,17,20,'text','how are you',1,'2024-04-30 14:44:59','2024-04-30 14:44:59',NULL),(224,20,17,'text','it\'s working',1,'2024-04-30 14:45:06','2024-04-30 14:45:06',NULL),(225,17,20,'text','ya its working perfectly',1,'2024-04-30 14:45:18','2024-04-30 14:45:18',NULL),(226,20,17,'text','good to go',1,'2024-04-30 14:45:23','2024-04-30 14:45:23',NULL),(227,17,20,'text','fine',1,'2024-04-30 14:45:25','2024-04-30 14:45:25',NULL),(228,20,17,'text','baby',1,'2024-04-30 14:45:30','2024-04-30 14:45:30',NULL),(229,20,17,'text','base',1,'2024-04-30 14:45:43','2024-04-30 14:45:43',NULL),(230,17,20,'text','pasand ',1,'2024-04-30 14:45:47','2024-04-30 14:45:47',NULL),(231,17,20,'text','hai',1,'2024-04-30 14:45:48','2024-04-30 14:45:48',NULL),(232,17,20,'media','',1,'2024-04-30 14:45:56','2024-04-30 14:45:56',NULL),(233,20,17,'media-text','radhe krishna',1,'2024-04-30 14:46:11','2024-04-30 14:46:11',NULL),(234,17,20,'text','radhe radhe',1,'2024-04-30 14:46:32','2024-04-30 14:46:32',NULL),(235,20,17,'media-text','bye bye',1,'2024-04-30 14:46:44','2024-04-30 14:46:44',NULL),(236,17,20,'media-text','pahechano',1,'2024-04-30 14:46:57','2024-04-30 14:46:57',NULL),(237,17,20,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 14:47:29','2024-04-30 14:47:46',NULL),(238,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 14:48:07','2024-04-30 14:48:38',NULL),(239,17,20,'sharedTweet','http://localhost:3000/get_comments/58',1,'2024-04-30 14:48:56','2024-04-30 14:49:12',NULL),(240,20,17,'sharedTweet','http://localhost:3000/get_comments/58',1,'2024-04-30 14:50:33','2024-04-30 14:51:22',NULL),(241,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 14:52:24','2024-04-30 14:52:38',NULL),(242,20,17,'sharedTweet','http://localhost:3000/get_comments/57',1,'2024-04-30 14:52:55','2024-04-30 14:53:02',NULL),(243,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 14:54:17','2024-04-30 14:54:24',NULL),(244,17,20,'text','hi',1,'2024-04-30 14:59:38','2024-04-30 14:59:43',NULL),(245,17,20,'text','hey',1,'2024-04-30 14:59:40','2024-04-30 14:59:43',NULL),(246,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 14:59:49','2024-04-30 14:59:58',NULL),(247,17,20,'text','hi',1,'2024-04-30 15:09:08','2024-04-30 15:09:12',NULL),(248,20,17,'text','hello',1,'2024-04-30 15:09:15','2024-04-30 15:09:15',NULL),(249,17,20,'text','su karo',1,'2024-04-30 15:09:19','2024-04-30 15:09:19',NULL),(250,20,17,'text','bas maja',1,'2024-04-30 15:09:24','2024-04-30 15:09:24',NULL),(251,20,17,'media-text','shivam',1,'2024-04-30 15:09:33','2024-04-30 15:09:33',NULL),(252,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:09:41','2024-04-30 15:09:52',NULL),(253,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:11:05','2024-04-30 15:12:11',NULL),(254,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:12:16','2024-04-30 15:12:21',NULL),(255,17,20,'text','hey',1,'2024-04-30 15:12:25','2024-04-30 15:12:42',NULL),(256,17,20,'text','hey',1,'2024-04-30 15:12:27','2024-04-30 15:12:42',NULL),(257,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:12:50','2024-04-30 15:13:00',NULL),(258,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:14:23','2024-04-30 15:14:33',NULL),(259,20,17,'sharedTweet','http://localhost:3000/get_comments/58',1,'2024-04-30 15:14:54','2024-04-30 15:15:35',NULL),(260,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:15:46','2024-04-30 15:15:58',NULL),(261,20,21,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:15:46','2024-05-01 04:41:14',NULL),(262,20,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:17:30','2024-04-30 15:17:41',NULL),(263,20,21,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-04-30 15:17:30','2024-05-01 04:41:14',NULL),(264,20,18,'sharedTweet','http://localhost:3000/get_comments/60',0,'2024-04-30 15:17:30',NULL,NULL),(265,17,20,'text','hey',1,'2024-05-01 04:10:30','2024-05-01 04:10:30',NULL),(266,20,17,'text','whats app',1,'2024-05-01 04:10:36','2024-05-01 04:10:36',NULL),(267,17,20,'text','good morning',1,'2024-05-01 04:10:42','2024-05-01 04:10:42',NULL),(268,20,17,'media-text','good morning',1,'2024-05-01 04:10:53','2024-05-01 04:10:54',NULL),(269,17,20,'media','',1,'2024-05-01 04:11:30','2024-05-01 04:11:30',NULL),(270,20,17,'text','?',1,'2024-05-01 04:11:38','2024-05-01 04:11:38',NULL),(271,17,20,'text','?',1,'2024-05-01 04:11:46','2024-05-01 04:11:46',NULL),(272,17,20,'media','',1,'2024-05-01 04:12:02','2024-05-01 04:12:02',NULL),(273,17,20,'text','http://localhost:3000/get_comments/59',1,'2024-05-01 04:12:27','2024-05-01 04:12:27',NULL),(274,17,20,'sharedTweet','http://localhost:3000/get_comments/59',1,'2024-05-01 04:12:45','2024-05-01 04:12:53',NULL),(275,17,18,'sharedTweet','http://localhost:3000/get_comments/59',0,'2024-05-01 04:12:45',NULL,NULL),(276,17,20,'text','hey',1,'2024-05-01 04:17:31','2024-05-01 04:17:31',NULL),(277,20,17,'sharedTweet','http://localhost:3000/get_comments/57',1,'2024-05-01 04:17:46','2024-05-01 04:17:51',NULL),(278,20,17,'sharedTweet','http://localhost:3000/get_comments/58',1,'2024-05-01 04:18:50','2024-05-01 04:18:55',NULL),(279,20,17,'sharedTweet','http://localhost:3000/get_comments/58',1,'2024-05-01 04:20:31','2024-05-01 04:40:47',NULL),(280,21,17,'text','hey',1,'2024-05-01 04:41:18','2024-05-01 04:41:18',NULL),(281,17,21,'text','whtas app',1,'2024-05-01 04:41:26','2024-05-01 04:41:26',NULL),(282,21,17,'text','good',1,'2024-05-01 04:41:30','2024-05-01 04:41:30',NULL),(283,17,21,'media','',1,'2024-05-01 04:41:45','2024-05-01 04:41:45',NULL),(284,17,21,'text','?',1,'2024-05-01 04:41:57','2024-05-01 04:41:57',NULL),(285,21,17,'media-text','ipl',1,'2024-05-01 04:42:16','2024-05-01 04:42:16',NULL),(286,17,21,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-05-01 04:42:34','2024-05-01 04:42:44',NULL),(287,17,20,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-05-01 04:42:34','2024-05-01 05:10:16',NULL),(288,17,18,'sharedTweet','http://localhost:3000/get_comments/60',0,'2024-05-01 04:42:34',NULL,NULL),(289,17,21,'sharedTweet','http://localhost:3000/get_comments/59',1,'2024-05-01 04:44:40','2024-05-01 04:49:49',NULL),(290,21,17,'text','hi',1,'2024-05-01 04:45:10','2024-05-01 04:45:56',NULL),(291,21,17,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-05-01 04:46:02','2024-05-01 04:46:07',NULL),(292,17,21,'text','hi',1,'2024-05-01 04:47:55','2024-05-01 04:49:49',NULL),(293,17,21,'text','hey',1,'2024-05-01 04:48:53','2024-05-01 04:49:49',NULL),(294,17,21,'text','hey',1,'2024-05-01 04:49:08','2024-05-01 04:49:49',NULL),(295,17,21,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-05-01 04:49:45','2024-05-01 04:49:49',NULL),(296,17,21,'sharedTweet','http://localhost:3000/get_comments/29',1,'2024-05-01 04:50:21','2024-05-01 04:52:04',NULL),(297,17,21,'sharedTweet','http://localhost:3000/get_comments/47',1,'2024-05-01 04:52:14','2024-05-01 04:52:28',NULL),(298,17,21,'sharedTweet','http://localhost:3000/get_comments/47',1,'2024-05-01 04:53:41','2024-05-01 04:53:47',NULL),(299,17,21,'sharedTweet','http://localhost:3000/get_comments/43',1,'2024-05-01 04:55:01','2024-05-01 04:55:08',NULL),(300,21,17,'text','hi',1,'2024-05-01 04:55:35','2024-05-01 04:55:41',NULL),(301,21,17,'text','hi',1,'2024-05-01 04:55:44','2024-05-01 04:55:44',NULL),(302,17,21,'text','hey',1,'2024-05-01 05:06:07','2024-05-01 05:06:07',NULL),(303,21,17,'text','hi',1,'2024-05-01 05:06:14','2024-05-01 05:06:14',NULL),(304,21,17,'text','nock nock',1,'2024-05-01 05:06:19','2024-05-01 05:06:19',NULL),(305,17,21,'text','who are you',1,'2024-05-01 05:06:24','2024-05-01 05:06:24',NULL),(306,21,17,'text','its Rj this side',1,'2024-05-01 05:06:37','2024-05-01 05:06:37',NULL),(307,21,17,'text','what about you',1,'2024-05-01 05:06:44','2024-05-01 05:06:44',NULL),(308,17,21,'text','is JP this side',1,'2024-05-01 05:06:53','2024-05-01 05:06:53',NULL),(309,17,21,'media','',1,'2024-05-01 05:06:58','2024-05-01 05:06:58',NULL),(310,21,17,'media-text','JP',1,'2024-05-01 05:07:11','2024-05-01 05:07:11',NULL),(311,17,21,'sharedTweet','http://localhost:3000/get_comments/60',1,'2024-05-01 05:07:25','2024-05-01 05:07:25',NULL),(312,17,21,'sharedTweet','http://localhost:3000/get_comments/43',1,'2024-05-01 05:08:39','2024-05-01 05:08:39',NULL),(313,21,17,'sharedTweet','http://localhost:3000/get_comments/47',1,'2024-05-01 05:12:03','2024-05-01 05:12:03',NULL),(314,21,20,'sharedTweet','http://localhost:3000/get_comments/47',1,'2024-05-01 05:12:03','2024-05-01 05:12:03',NULL),(315,21,18,'sharedTweet','http://localhost:3000/get_comments/61',0,'2024-05-01 06:38:45',NULL,NULL),(316,21,18,'sharedTweet','http://localhost:3000/get_comments/61',0,'2024-05-01 06:39:23',NULL,NULL),(317,21,20,'sharedTweet','http://localhost:3000/get_comments/61',0,'2024-05-01 06:39:23',NULL,NULL),(318,21,18,'sharedTweet','http://localhost:3000/get_comments/49',0,'2024-05-01 06:39:33',NULL,NULL),(319,21,20,'sharedTweet','http://localhost:3000/get_comments/49',0,'2024-05-01 06:39:33',NULL,NULL),(320,17,18,'sharedTweet','http://localhost:3000/get_comments/61',0,'2024-05-01 06:40:34',NULL,NULL),(321,17,18,'sharedTweet','http://localhost:3000/get_comments/61',0,'2024-05-01 06:40:46',NULL,NULL),(322,17,18,'sharedTweet','http://localhost:3000/get_comments/61',0,'2024-05-01 06:40:52',NULL,NULL),(323,17,18,'sharedTweet','http://localhost:3000/get_comments/61',0,'2024-05-01 06:45:03',NULL,NULL),(324,17,20,'sharedTweet','http://localhost:3000/get_comments/61',0,'2024-05-01 06:45:08',NULL,NULL),(325,17,21,'sharedTweet','http://localhost:3000/get_comments/61',1,'2024-05-01 06:45:08','2024-05-01 12:43:40',NULL),(326,17,29,'sharedTweet','http://localhost:3000/get_comments/39',0,'2024-05-01 06:47:55',NULL,NULL),(327,21,17,'text','hey',1,'2024-05-01 12:43:45','2024-05-01 12:44:00',NULL),(328,21,17,'media-text','good',1,'2024-05-01 12:43:51','2024-05-01 12:44:00',NULL),(329,21,17,'text','hey',1,'2024-05-01 15:08:14','2024-05-01 15:09:23',NULL),(330,21,17,'text','whtsapp',1,'2024-05-01 15:08:56','2024-05-01 15:09:23',NULL),(331,21,17,'media','',1,'2024-05-01 15:09:00','2024-05-01 15:09:23',NULL),(332,21,17,'media-text','hi',1,'2024-05-01 15:09:05','2024-05-01 15:09:23',NULL),(333,17,20,'sharedTweet','http://localhost:3000/get_comments/70',0,'2024-05-01 15:14:49',NULL,NULL),(334,17,21,'sharedTweet','http://localhost:3000/get_comments/70',1,'2024-05-01 15:15:06','2024-05-01 15:15:11',NULL),(335,17,29,'text','CREATE TABLE `support_messages` (   `id` int NOT NULL AUTO_INCREMENT,   `sender_id` int NOT NULL,   `receiver_id` int NOT NULL,   `tickit_id` varchar(20) NOT NULL,   `content` text,   `created_at` timestamp NULL DEFAULT (now()),   `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,   `deleted_at` timestamp NULL DEFAULT NULL,   PRIMARY KEY (`id`),   KEY `tickit_id` (`tickit_id`),   KEY `sender_id` (`sender_id`),   KEY `receiver_id` (`receiver_id`),   CONSTRAINT `support_messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),   CONSTRAINT `support_messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),   CONSTRAINT `support_messages_ibfk_3` FOREIGN KEY (`tickit_id`) REFERENCES `get_support` (`id`),  ) ',0,'2024-05-01 15:44:16',NULL,NULL);
/*!40000 ALTER TABLE `direct_messages` ENABLE KEYS */;
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
