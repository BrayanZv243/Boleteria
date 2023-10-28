const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"

router.post('/', UsuarioController.crearUsuario);
router.post('/admin', UsuarioController.crearUsuario);
router.get('/', verificarToken, verificarRolAdmin(admin), UsuarioController.obtenerUsuarios);
router.get('/:id', verificarToken, UsuarioController.obtenerUsuarioPorId);
router.put('/:id', verificarToken, UsuarioController.actualizarUsuario);
router.delete('/:id', verificarToken, UsuarioController.eliminarUsuario);

module.exports = router;
