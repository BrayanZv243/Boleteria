const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'App Web/images/eventos'); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const ImagesController = require('../controllers/ImagesController')

// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"

router.post('/', verificarToken, verificarRolAdmin(admin), upload.single('image'), ImagesController.guardarImg);

router.get('/', ImagesController.obtenerImgs);
router.get('/:filename', ImagesController.obtenerImgPorNombre);

router.put('/:filename', upload.single('image'), ImagesController.actualizarImg);

module.exports = router;
