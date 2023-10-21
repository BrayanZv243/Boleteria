const express = require('express');
const router = express.Router();
const CarritoCompraController = require('../controllers/CarritoCompraController');

router.get('/', CarritoCompraController.obtenerCarritosCompra);
router.get('/usuario/:id', CarritoCompraController.obtenerCarritoCompraPorIdUsuario);
router.get('/:id', CarritoCompraController.obtenerCarritoCompraPorId);

router.put('/:id/boletos', CarritoCompraController.agregarBoletosACarritoCompra);

router.delete('/:id/boletos', CarritoCompraController.eliminarBoletosACarritoCompra);

module.exports = router;
