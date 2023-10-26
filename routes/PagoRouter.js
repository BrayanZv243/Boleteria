const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/PagoController');

router.post('/', PagoController.crearPago);

router.get('/', PagoController.obtenerPagos);
router.get('/:id', PagoController.obtenerPagoPorId);
router.get('/usuario/:id', PagoController.obtenerPagosPorIdUsuario);

router.delete('/:id', PagoController.eliminarPago);

module.exports = router;