const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/CompraController');
// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"

router.get('/', verificarToken, CompraController.obtenerCompras);
router.get('/boletos', verificarToken, CompraController.obtenerTodosLosBoletosComprados);


module.exports = router;