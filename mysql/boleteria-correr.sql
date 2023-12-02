-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: boleteria
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `asientos`
--

DROP TABLE IF EXISTS `asientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asientos` (
  `idAsiento` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  `filaYNumero` varchar(255) NOT NULL,
  PRIMARY KEY (`idAsiento`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asientos`
--

LOCK TABLES `asientos` WRITE;
/*!40000 ALTER TABLE `asientos` DISABLE KEYS */;
INSERT INTO `asientos` VALUES (2,'VIP','H25'),(3,'VIP','A1'),(4,'NORMAL','B10'),(5,'VIP+','C5'),(6,'ELITE','D20'),(7,'VIP','E15'),(8,'NORMAL','F30'),(9,'VIP+','G3'),(10,'ELITE','H8'),(11,'VIP','I12'),(14,'NORMAL','H25'),(17,'NORMAL','AA22'),(18,'VIP+','AC52');
/*!40000 ALTER TABLE `asientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boletos`
--

DROP TABLE IF EXISTS `boletos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boletos` (
  `idBoleto` int NOT NULL AUTO_INCREMENT,
  `idEvento` int NOT NULL,
  `idAsiento` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`idBoleto`),
  KEY `fk_boletos_eventos1_idx` (`idEvento`),
  KEY `fk_boletos_asientos1_idx` (`idAsiento`),
  CONSTRAINT `fk_boletos_asientos1` FOREIGN KEY (`idAsiento`) REFERENCES `asientos` (`idAsiento`),
  CONSTRAINT `fk_boletos_eventos1` FOREIGN KEY (`idEvento`) REFERENCES `eventos` (`idEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=392 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boletos`
--

LOCK TABLES `boletos` WRITE;
/*!40000 ALTER TABLE `boletos` DISABLE KEYS */;
INSERT INTO `boletos` VALUES (302,189,2,50.00,'VENDIDO'),(303,189,3,50.00,'VENDIDO'),(304,189,4,50.00,'DISPONIBLE'),(305,189,5,50.00,'DISPONIBLE'),(306,189,6,50.00,'DISPONIBLE'),(329,192,2,990.00,'VENDIDO'),(330,192,3,990.00,'VENDIDO'),(331,192,4,990.00,'VENDIDO'),(332,192,5,990.00,'DISPONIBLE'),(333,192,6,990.00,'DISPONIBLE'),(334,192,7,990.00,'DISPONIBLE'),(335,192,8,990.00,'DISPONIBLE'),(336,192,9,990.00,'VENDIDO'),(337,192,10,990.00,'DISPONIBLE');
/*!40000 ALTER TABLE `boletos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_compra`
--

DROP TABLE IF EXISTS `carrito_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_compra` (
  `idCarrito_Compra` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idCarrito_Compra`),
  KEY `fk_carrito_compra_usuarios1_idx` (`idUsuario`),
  CONSTRAINT `fk_carrito_compra_usuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_compra`
--

LOCK TABLES `carrito_compra` WRITE;
/*!40000 ALTER TABLE `carrito_compra` DISABLE KEYS */;
INSERT INTO `carrito_compra` VALUES (7,75,0.00),(9,77,0.00),(12,80,0.00),(13,81,0.00),(25,92,0.00);
/*!40000 ALTER TABLE `carrito_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_compra_has_boletos`
--

DROP TABLE IF EXISTS `carrito_compra_has_boletos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_compra_has_boletos` (
  `idCarrito_Compra` int NOT NULL,
  `idBoleto` int NOT NULL,
  PRIMARY KEY (`idCarrito_Compra`,`idBoleto`),
  KEY `fk_carrito_compra_has_boletos_boletos1_idx` (`idBoleto`),
  KEY `fk_carrito_compra_has_boletos_carrito_compra1_idx` (`idCarrito_Compra`),
  CONSTRAINT `fk_carrito_compra_has_boletos_boletos1` FOREIGN KEY (`idBoleto`) REFERENCES `boletos` (`idBoleto`),
  CONSTRAINT `fk_carrito_compra_has_boletos_carrito_compra1` FOREIGN KEY (`idCarrito_Compra`) REFERENCES `carrito_compra` (`idCarrito_Compra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_compra_has_boletos`
--

LOCK TABLES `carrito_compra_has_boletos` WRITE;
/*!40000 ALTER TABLE `carrito_compra_has_boletos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito_compra_has_boletos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `idPago` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idCompra`),
  KEY `fk_compras_pagos1_idx` (`idPago`),
  CONSTRAINT `fk_compras_pagos1` FOREIGN KEY (`idPago`) REFERENCES `pagos` (`idPago`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (16,23,1206.40),(17,24,1148.40),(18,25,1148.40),(19,26,1206.40);
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras_has_boletos`
--

DROP TABLE IF EXISTS `compras_has_boletos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras_has_boletos` (
  `idCompra` int NOT NULL,
  `idBoleto` int NOT NULL,
  PRIMARY KEY (`idCompra`,`idBoleto`),
  KEY `fk_compras_has_boletos_boletos1_idx` (`idBoleto`),
  KEY `fk_compras_has_boletos_compras1_idx` (`idCompra`),
  CONSTRAINT `fk_compras_has_boletos_boletos1` FOREIGN KEY (`idBoleto`) REFERENCES `boletos` (`idBoleto`),
  CONSTRAINT `fk_compras_has_boletos_compras1` FOREIGN KEY (`idCompra`) REFERENCES `compras` (`idCompra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras_has_boletos`
--

LOCK TABLES `compras_has_boletos` WRITE;
/*!40000 ALTER TABLE `compras_has_boletos` DISABLE KEYS */;
INSERT INTO `compras_has_boletos` VALUES (16,302),(19,303),(17,329),(16,330),(18,331),(19,336);
/*!40000 ALTER TABLE `compras_has_boletos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `idEvento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `lugar` varchar(500) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `numBoletosVendidos` int NOT NULL,
  `numBoletosDisponibles` int NOT NULL,
  `nombreImagen` varchar(500) NOT NULL,
  PRIMARY KEY (`idEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (189,'Torneo Smash Bros','Animecon','CONCIERTO','2023-12-15 20:30:00',2,3,'smash.jpg'),(192,'Kimetsu no Yaiba Evento','Animecon - Obregón','ARTE Y CULTURA','2023-12-08 13:29:00',4,6,'102197914.png');
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `idPago` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `metodo` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idPago`),
  KEY `idUsuario_idx` (`idUsuario`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (23,80,1206.40,'BBVA','2023-12-01 14:01:00'),(24,80,1148.40,'BBVA','2023-12-01 15:49:00'),(25,77,1148.40,'BBVA','2023-12-01 18:06:00'),(26,80,1206.40,'BANCO AZTECA','2023-12-01 21:29:00');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `tipoUsuario` varchar(45) NOT NULL,
  `edad` int NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `activa` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (75,'Brayan','Zavala','NORMAL',20,'6441596164','zavala_243@hotmail.com','$2b$10$9ZXD6yNFse4fZBcVwYBqBeU32IPRs31Rvu3IEKX.5sbfTPimRxyZu:$2b$10$9ZXD6yNFse4fZBcVwYBqBe','ACTIVA'),(77,'Kevin','Salazar','NORMAL',25,'6441596164','kevin@hotmail.com','$2b$10$tEACj.dnSR/.zkqtNmjN..00.3qDq4HQZIaYyOHKiXWqfahWVuoNi:$2b$10$tEACj.dnSR/.zkqtNmjN..','ACTIVA'),(80,'Brayan','Zavala','ADMIN',20,'6441596164','brayan@hotmail.com','$2b$10$W7Nm9RJYvrdhbMGQlA/VnuFJbYfwYcvAUFhG1nQp6NILdXJWjXV2a:$2b$10$W7Nm9RJYvrdhbMGQlA/Vnu','ACTIVA'),(81,'Luis','Toledo','NORMAL',21,'6441596164','luis@hotmail.com','$2b$10$E9Hu.a3t739FrOL7qWHT0OCcr3P0RqovHc.oJLdK/NxEtfNK9i.iK:$2b$10$1h7gYgJjhSaT3LESXKViye','ACTIVA'),(92,'Sofia','Cazares','NORMAL',55,'1234567891','sofia@hotmail.com','$2b$10$P88RNpQruha7ZhEhVOikvujQr2k912UAAOwMLr6t3Y4sL/6hO8.nC:$2b$10$nz3qlNpWWjWGUN11kytLk.','INACTIVA');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'boleteria'
--

--
-- Dumping routines for database 'boleteria'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-02 16:55:29
