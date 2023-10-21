const express = require('express');
const router = express.Router();
const BoletoController = require('../controllers/BoletoController');

router.post('/', BoletoController.crearBoleto);

router.get('/', BoletoController.obtenerBoletos);
router.get('/:id', BoletoController.obtenerBoletoPorId);
router.get('/evento/:id', BoletoController.obtenerBoletosPorIdEvento);

router.put('/:id', BoletoController.actualizarBoleto);
router.delete('/:id', BoletoController.eliminarBoleto);

module.exports = router;
