CREATE DATABASE  IF NOT EXISTS `boleteria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `boleteria`;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asientos`
--

LOCK TABLES `asientos` WRITE;
/*!40000 ALTER TABLE `asientos` DISABLE KEYS */;
INSERT INTO `asientos` VALUES (2,'VIP','H52'),(3,'VIP','A1'),(4,'NORMAL','B10'),(5,'VIP+','C5'),(6,'ELITE','D20'),(7,'VIP','E15'),(8,'NORMAL','F30'),(9,'VIP+','G3'),(10,'ELITE','H8'),(11,'VIP','I12'),(13,'NORMAL','J25');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boletos`
--

LOCK TABLES `boletos` WRITE;
/*!40000 ALTER TABLE `boletos` DISABLE KEYS */;
INSERT INTO `boletos` VALUES (2,7,5,25000.00,'VENDIDO'),(3,8,2,25000.00,'VENDIDO'),(4,7,6,1500.00,'DISPONIBLE'),(6,7,5,25000.00,'VENDIDO'),(7,12,5,15500.00,'DISPONIBLE');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_compra`
--

LOCK TABLES `carrito_compra` WRITE;
/*!40000 ALTER TABLE `carrito_compra` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
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
  PRIMARY KEY (`idEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Perros Sonora','ITSON','Banda','2023-10-20 00:00:00',0,100),(7,'Evento 1','Las Lomas','Concierto','2023-10-23 00:00:00',6,194),(8,'Evento 2','Centro de Convenciones','Conferencia','2023-11-15 00:00:00',3,147),(9,'Evento 3','Teatro Municipal','Obra de Teatro','2023-12-05 00:00:00',0,180),(10,'Evento 4','Estadio Nacional','Deporte','2023-11-08 00:00:00',0,300),(11,'Evento 5','Parque de la Ciudad','Festival','2024-07-20 00:00:00',0,250),(12,'Peso Pluma','Arena ITSON','Concierto','2023-11-25 00:00:00',250,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
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
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (70,'Juan','Pérez','NORMAL',25,'1234567890','juan.perez@example.com','Password123'),(71,'María','González','PREMIUM',30,'9876543210','maria.gonzalez@example.com','SecurePassword456'),(72,'Carlos','Sánchez','NORMAL',22,'5555555555','carlos.sanchez@example.com','StrongPass789'),(73,'Laura','Torres','PREMIUM',28,'6666666666','laura.torres@example.com','TopSecret123');
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

-- Dump completed on 2023-10-26 21:18:20
