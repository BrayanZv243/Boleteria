const express = require('express');
const router = express.Router();
const AsientoController = require('../controllers/AsientoController');

router.post('/', AsientoController.crearAsiento);
router.get('/', AsientoController.obtenerAsientos);
router.get('/:id', AsientoController.obtenerAsientoPorId);
router.put('/:id', AsientoController.actualizarAsiento);
router.delete('/:id', AsientoController.eliminarAsiento);

module.exports = router;
