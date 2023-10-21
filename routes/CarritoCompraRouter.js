const express = require('express');
const router = express.Router();
const CarritoCompraController = require('../controllers/CarritoCompraController');

router.get('/', CarritoCompraController.obtenerCarritosCompra);
router.get('/usuario/:id', CarritoCompraController.obtenerCarritoCompraPorIdUsuario);
router.get('/:id', CarritoCompraController.obtenerCarritoCompraPorId);

router.put('/boleto/:id', CarritoCompraController.agregarBoletosACarritoCompra);

router.delete('/boleto/:id', CarritoCompraController.eliminarBoletosACarritoCompra);

module.exports = router;
