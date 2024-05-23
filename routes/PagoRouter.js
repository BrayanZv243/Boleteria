const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/PagoController');
// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"

router.post('/', verificarToken, PagoController.crearPago);

router.get('/', verificarToken, verificarRolAdmin(admin), PagoController.obtenerPagos);
router.get('/:id', verificarToken, verificarRolAdmin(admin), PagoController.obtenerPagoPorId);
router.get('/usuario/:id', verificarToken, PagoController.obtenerPagosPorIdUsuario);


module.exports = router;