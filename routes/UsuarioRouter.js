const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

router.post('/', UsuarioController.crearUsuario);
router.post('/admin', UsuarioController.crearUsuario);
router.get('/', verificarToken, verificarRolAdmin('ADMIN'), UsuarioController.obtenerUsuarios);
router.get('/:id', verificarToken, UsuarioController.obtenerUsuarioPorId);
router.put('/:id', UsuarioController.actualizarUsuario);
router.delete('/:id', UsuarioController.eliminarUsuario);

module.exports = router;
