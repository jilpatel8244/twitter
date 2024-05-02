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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,17,25,0,1),(2,25,17,0,1),(3,17,26,0,1),(4,26,17,0,1),(5,25,26,0,1),(6,26,25,0,1),(7,17,18,0,1),(8,18,17,0,1),(9,17,20,0,1),(10,20,17,0,1),(11,17,21,0,1),(12,21,17,0,1),(13,17,19,0,1),(14,19,17,0,1),(15,20,21,0,1),(16,21,20,0,1),(17,18,21,0,1),(18,21,18,0,1),(19,18,20,0,1),(20,20,18,0,1),(21,17,29,0,1),(22,29,17,0,1),(23,30,17,0,1),(24,30,17,0,1),(25,17,28,0,1),(26,28,18,0,1),(27,28,21,0,1),(28,19,21,0,1),(29,21,22,0,1),(30,21,23,0,1),(31,21,24,0,1),(32,20,31,0,1);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
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
