const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/SesionController');

router.post('/login', SessionController.iniciarSesion);

module.exports = router;
