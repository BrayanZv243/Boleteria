const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventoController');
// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"

router.post('/', verificarToken, verificarRolAdmin(admin), EventoController.crearEvento);
router.get('/', verificarToken, EventoController.obtenerEventos);
router.get('/:id', verificarToken, EventoController.obtenerEventoPorId);
router.put('/:id', verificarToken, verificarRolAdmin(admin), EventoController.actualizarEvento);
router.delete('/:id', verificarToken, verificarRolAdmin(admin), EventoController.eliminarEvento);

module.exports = router;
