const express = require('express');
const router = express.Router();
const CarritoCompraController = require('../controllers/CarritoCompraController');

// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"

router.get('/', verificarToken, verificarRolAdmin(admin), CarritoCompraController.obtenerCarritosCompra);
router.get('/usuario/:id', verificarToken, CarritoCompraController.obtenerCarritoCompraPorIdUsuario);
router.get('/:id', verificarToken, CarritoCompraController.obtenerCarritoCompraPorId);

router.put('/:id/boletos', verificarToken, CarritoCompraController.agregarBoletosACarritoCompra);

router.delete('/:id/boletos', verificarToken, CarritoCompraController.eliminarBoletosACarritoCompra);

module.exports = router;
