const express = require('express');
const router = express.Router();
const AsientoController = require('../controllers/AsientoController');
// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"

router.post('/', verificarToken, verificarRolAdmin(admin), AsientoController.crearAsiento);
router.get('/', verificarToken, AsientoController.obtenerAsientos);
router.get('/:id', verificarToken, verificarRolAdmin(admin), AsientoController.obtenerAsientoPorId);
router.put('/:id', verificarToken, verificarRolAdmin(admin), AsientoController.actualizarAsiento);
router.delete('/:id', verificarToken, verificarRolAdmin(admin), AsientoController.eliminarAsiento);

module.exports = router;
