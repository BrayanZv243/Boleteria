const { AppError } = require('../utils/appError');
const path = require('path');
const fs = require('fs');

class ImagesController {
    static async guardarImg(req, res, next) {
        try {
            res.status(200).json({ message: 'Imagen cargada con éxito' });
        } catch (error) {
            console.log(error);
        }
    }

    static async obtenerImgPorNombre(req, res, next) {
        try {
            const filename = req.params.filename;
            const imagePath = path.join(__dirname, '../App Web/images', filename); // Ruta completa al archivo de imagen
            res.sendFile(imagePath);
        } catch (error) {
            console.log(error);
        }

    }

    static async obtenerImgs(req, res, next) {
        try {
            const directoryPath = path.join(__dirname, '../App Web/images/eventos'); // Ruta al directorio de imágenes

            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    console.error('Error al leer el directorio de imágenes: ' + err);
                    res.status(500).send('Error interno del servidor');
                } else {
                    // Filtrar los archivos para obtener solo las imágenes
                    const imageFiles = files.filter(file => {
                        const fileExtension = path.extname(file).toLowerCase();
                        return ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension);
                    });

                    // Enviar la lista de archivos de imágenes al cliente
                    res.json({ images: imageFiles });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async actualizarImg(req, res, next) {
        try {
            const { filename } = req.params;
            const imagePath = path.join(__dirname, '../App Web/images', filename);

            // Comprueba si la imagen con el nombre especificado existe en el directorio
            if (!fs.existsSync(imagePath)) {
                return res.status(404).json({ message: 'La imagen no existe' });
            }

            // Lee la nueva imagen desde la solicitud
            const newImage = req.file;

            if (newImage) {
                // Verifica si la nueva imagen es diferente de la original
                if (newImage.originalname !== filename) {
                    // Elimina el archivo original
                    try {
                        fs.unlinkSync(imagePath);
                    } catch (err) {
                        console.error('Error al eliminar el archivo original:', err);
                    }

                    // Mueve la nueva imagen al destino
                    const newImagePath = path.join(__dirname, '../App Web/images', filename);

                    await fs.rename(newImage.path, newImagePath, (err) => {
                        if (err) {
                            console.error('Error al mover la nueva imagen:', err);
                            return res.status(500).json({ message: 'Error al mover la nueva imagen' });
                        }

                        return res.status(200).json({ message: 'Imagen actualizada con éxito' });
                    });
                } else {
                    // La nueva imagen y la original son iguales, no es necesario hacer cambios
                    return res.status(200).json({ message: 'Imagen actualizada con éxito' });
                }
            } else {
                return res.status(400).json({ message: 'No se proporcionó una nueva imagen' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }




    static async eliminarImg(req, res, next) {
        try {

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ImagesController;