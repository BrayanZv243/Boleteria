const express = require('express');
const router = express.Router();
const BoletoController = require('../controllers/BoletoController');

// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"

router.post('/', verificarToken, verificarRolAdmin(admin), BoletoController.crearBoleto);

router.get('/', verificarToken, BoletoController.obtenerBoletos);
router.get('/:id', verificarToken, BoletoController.obtenerBoletoPorId);
router.get('/evento/:id', verificarToken, BoletoController.obtenerBoletosPorIdEvento);

router.put('/:id', verificarToken, verificarRolAdmin(admin), BoletoController.actualizarBoleto);
router.delete('/:id', verificarToken, verificarRolAdmin(admin), BoletoController.eliminarBoleto);
router.delete('/evento/:id', verificarToken, verificarRolAdmin(admin), BoletoController.eliminarBoletosPorIdEvento);


module.exports = router;
