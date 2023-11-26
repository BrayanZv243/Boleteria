const { UsuarioDAO } = require('../dataAccess/usuarioDAO');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const saltRounds = 10;
const { generarToken } = require('../auth/auth');
const { AppError } = require('../utils/appError');


class SessionController {

    static async iniciarSesion(req, res, next) {
        try {
            const { correo, contraseña } = req.body;

            // Validamos los datos
            const errores = await SessionController.validarCampos(correo, contraseña);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 401));
                res.status(401).json({ statusCode: 401, message: errores.join(', ') });
            } else {
                // Obtenemos el usuario por correo
                const usuarioEncontrado = await UsuarioDAO.obtenerUsuarioPorCorreo(correo);
                // Validamos si encontró un usuario
                if (!usuarioEncontrado) {
                    return res.status(401).json({ statusCode: 401, mensaje: `Usuario o contraseña incorrectos` });
                }

                // Validamos que el correo y contraseña coincidan.
                const correoEncontrado = usuarioEncontrado.dataValues.correo;
                const contraseñaEncontrada = usuarioEncontrado.dataValues.contraseña;

                if (correo === correoEncontrado && contraseña === contraseñaEncontrada) {
                    const token = await generarToken(usuarioEncontrado);
                    res.status(200).json({
                        "message": "Token generado con éxito para usuario "+usuarioEncontrado.tipoUsuario,
                        "token": token
                    });
                } else {
                    res.status(401).json({ statusCode: 401, mensaje: `El correo o contraseña no son correctos.` })
                }

                
            }

            // Aquí es para desencriptar la contraseña.
            // Generar una sal y hash de contraseña
            /*
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash('contrasenaDelUsuario', salt, (err, hash) => {
                    // Almacena el hash y la sal en la base de datos
                });
            });

            // Verificar una contraseña
            bcrypt.compare('contrasenaIngresada', hashAlmacenado, (err, result) => {
                if (result) {
                    // La contraseña es válida
                } else {
                    // La contraseña es incorrecta
                }
            });
            */

            

        } catch (error) {
            console.log("Error en controlador sesion: "+error);

        }
    }

    static async validarCampos(correo, contraseña) {
        const errores = [];

        if (typeof correo !== 'string' || correo.trim() === '') {
            errores.push('Correo es requerido y debe ser una cadena no vacía.');
        }

        if (typeof contraseña !== 'string' || contraseña.trim() === '') {
            errores.push('Contraseña es requerido y debe ser una cadena no vacía.');
        }

        return errores;
    }
}

module.exports = SessionController;