const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
let filePath = 'App Web/images/eventos/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const existsFile = filePath + file.originalname;
        
        if (fs.existsSync(existsFile)) {
            return cb(new Error('La imagen con ese nombre ya existe.'));
        }

        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const ImagesController = require('../controllers/ImagesController')

// Importa el middleware de verificación de token
const { verificarToken, verificarRolAdmin } = require('../auth/auth');

const admin = "ADMIN"


// Middleware de ejemplo usando el middleware de multer y manejando errores
const uploadMiddleware = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Manejar el error devuelto por multer
            return res.status(400).json({ status: 400, message: err.message });
        }

        // La subida fue exitosa, continuar con el siguiente middleware o controlador
        next();
    });
};


router.post('/', verificarToken, verificarRolAdmin(admin), uploadMiddleware, ImagesController.guardarImg);


router.get('/', verificarToken, ImagesController.obtenerImgs);
router.get('/:filename', verificarToken, ImagesController.obtenerImgPorNombre);

router.put('/:filename', verificarToken, verificarRolAdmin(admin), uploadMiddleware, ImagesController.actualizarImg);

router.delete('/:filename', verificarToken, verificarRolAdmin(admin), ImagesController.eliminarImg);

module.exports = router;
