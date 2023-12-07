const path = require('path');
const fs = require('fs');
const filePath = '../App Web/images/eventos';

class ImagesController {
    static async guardarImg(req, res, next) {
        try {
            res.status(200).json({ nombre: req.file, message: 'Imagen cargada con éxito' });
        } catch (error) {
            console.log(error);
        }
    }

    static async obtenerImgPorNombre(req, res, next) {
        try {
            const filename = req.params.filename;
            const imagePath = path.join(__dirname, filePath, filename); // Ruta completa al archivo de imagen
            res.sendFile(imagePath);
        } catch (error) {
            console.log(error);
        }

    }

    static async obtenerImgs(req, res, next) {
        try {
            const directoryPath = path.join(__dirname, filePath); // Ruta al directorio de imágenes

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
        const { filename } = req.params;
        const imagePath = path.join(__dirname, filePath, filename);

        try {
            if (!fs.existsSync(imagePath)) {
                return res.status(404).json({ message: 'La imagen no existe' });
            }

            const newImage = req.file;
            
            if (newImage) {
                if (newImage.originalname !== filename) {
                    // Elimina el archivo original si existe
                    if (fs.existsSync(imagePath)) {
                        await fs.promises.unlink(imagePath);
                    }

                    // Usa la misma ruta para la nueva imagen
                    const newImagePath = path.join(__dirname, filePath, newImage.originalname);

                    await fs.promises.rename(newImage.path, newImagePath);
                    return res.status(200).json({ message: 'Imagen actualizada con éxito' });
                } else {
                    return res.status(200).json({ message: 'La nueva imagen es igual a la original. No se realizaron cambios.' });
                }
            } else {
                return res.status(400).json({ message: 'No se proporcionó una nueva imagen' });
            }
        } catch (error) {
            console.error('Error en la función actualizarImg:', error);
            res.status(500).json({ message: 'Error en el servidor al actualizar la imagen' });
        }
    }



    static async eliminarImg(req, res, next) {
        try {
            const { filename } = req.params;
            const imagePath = path.join(__dirname, filePath, filename);

            // Verifica si la imagen con el nombre especificado existe en el directorio
            if (!fs.existsSync(imagePath)) {
                return res.status(404).json({ message: 'La imagen no existe' });
            }

            // Elimina el archivo
            await fs.promises.unlink(imagePath);

            return res.status(200).json({ message: 'Imagen eliminada con éxito' });
        } catch (error) {
            console.error('Error en la función eliminarImg:', error);
            res.status(500).json({ message: 'Error en el servidor al eliminar la imagen' });
        }
    }

}

module.exports = ImagesController;