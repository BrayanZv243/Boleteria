const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/SesionController');

router.post('/', SessionController.iniciarSesion);

module.exports = router;
