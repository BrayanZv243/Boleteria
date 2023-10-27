const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/CompraController');

router.get('/', CompraController.obtenerCompras);

module.exports = router;