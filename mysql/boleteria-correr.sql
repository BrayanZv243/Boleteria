-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema boleteria
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema boleteria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `boleteria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `boleteria` ;

-- -----------------------------------------------------
-- Table `boleteria`.`asientos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`asientos` (
  `idAsiento` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(255) NOT NULL,
  `filaYNumero` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idAsiento`))
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`eventos` (
  `idEvento` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `lugar` VARCHAR(500) NOT NULL,
  `tipo` VARCHAR(255) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `nombreImagen` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idEvento`))
ENGINE = InnoDB
AUTO_INCREMENT = 199
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`boletos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`boletos` (
  `idBoleto` INT NOT NULL AUTO_INCREMENT,
  `idEvento` INT NOT NULL,
  `idAsiento` INT NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idBoleto`),
  INDEX `fk_boletos_eventos1_idx` (`idEvento` ASC) VISIBLE,
  INDEX `fk_boletos_asientos1_idx` (`idAsiento` ASC) VISIBLE,
  CONSTRAINT `fk_boletos_asientos1`
    FOREIGN KEY (`idAsiento`)
    REFERENCES `boleteria`.`asientos` (`idAsiento`),
  CONSTRAINT `fk_boletos_eventos1`
    FOREIGN KEY (`idEvento`)
    REFERENCES `boleteria`.`eventos` (`idEvento`))
ENGINE = InnoDB
AUTO_INCREMENT = 392
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `apellido` VARCHAR(255) NOT NULL,
  `tipoUsuario` VARCHAR(45) NOT NULL,
  `edad` INT NOT NULL,
  `telefono` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `contraseña` VARCHAR(255) NOT NULL,
  `activa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 94
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`carrito_compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`carrito_compra` (
  `idCarrito_Compra` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idCarrito_Compra`),
  INDEX `fk_carrito_compra_usuarios1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_compra_usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `boleteria`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`carrito_compra_has_boletos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`carrito_compra_has_boletos` (
  `idCarrito_Compra` INT NOT NULL,
  `idBoleto` INT NOT NULL,
  PRIMARY KEY (`idCarrito_Compra`, `idBoleto`),
  INDEX `fk_carrito_compra_has_boletos_boletos1_idx` (`idBoleto` ASC) VISIBLE,
  INDEX `fk_carrito_compra_has_boletos_carrito_compra1_idx` (`idCarrito_Compra` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_compra_has_boletos_boletos1`
    FOREIGN KEY (`idBoleto`)
    REFERENCES `boleteria`.`boletos` (`idBoleto`),
  CONSTRAINT `fk_carrito_compra_has_boletos_carrito_compra1`
    FOREIGN KEY (`idCarrito_Compra`)
    REFERENCES `boleteria`.`carrito_compra` (`idCarrito_Compra`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`pagos` (
  `idPago` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `monto` DECIMAL(10,2) NOT NULL,
  `metodo` VARCHAR(255) NOT NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idPago`),
  INDEX `idUsuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `idUsuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `boleteria`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`compras` (
  `idCompra` INT NOT NULL AUTO_INCREMENT,
  `idPago` INT NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idCompra`),
  INDEX `fk_compras_pagos1_idx` (`idPago` ASC) VISIBLE,
  CONSTRAINT `fk_compras_pagos1`
    FOREIGN KEY (`idPago`)
    REFERENCES `boleteria`.`pagos` (`idPago`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`compras_has_boletos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`compras_has_boletos` (
  `idCompra` INT NOT NULL,
  `idBoleto` INT NOT NULL,
  PRIMARY KEY (`idCompra`, `idBoleto`),
  INDEX `fk_compras_has_boletos_boletos1_idx` (`idBoleto` ASC) VISIBLE,
  INDEX `fk_compras_has_boletos_compras1_idx` (`idCompra` ASC) VISIBLE,
  CONSTRAINT `fk_compras_has_boletos_boletos1`
    FOREIGN KEY (`idBoleto`)
    REFERENCES `boleteria`.`boletos` (`idBoleto`),
  CONSTRAINT `fk_compras_has_boletos_compras1`
    FOREIGN KEY (`idCompra`)
    REFERENCES `boleteria`.`compras` (`idCompra`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `boleteria`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `boleteria`.`sequelizemeta` (
  `name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
