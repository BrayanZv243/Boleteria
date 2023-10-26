const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/CompraController');

router.post('/', CompraController.crearCompra);
router.get('/', CompraController.obtenerCompras);


module.exports = router;