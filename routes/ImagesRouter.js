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

router.get('/', verificarToken, ImagesController.obtenerImgs);
router.get('/:filename', verificarToken, ImagesController.obtenerImgPorNombre);

router.put('/:filename', verificarToken, verificarRolAdmin(admin), upload.single('image'), ImagesController.actualizarImg);

router.delete('/:filename', verificarToken, verificarRolAdmin(admin), ImagesController.eliminarImg);

module.exports = router;
