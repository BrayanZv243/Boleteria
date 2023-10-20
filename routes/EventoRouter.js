const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventoController');

router.post('/', EventoController.crearEvento);
router.get('/', EventoController.obtenerEventos);
router.get('/:id', EventoController.obtenerEventoPorId);
router.put('/:id', EventoController.actualizarEvento);
router.delete('/:id', EventoController.eliminarEvento);

module.exports = router;
