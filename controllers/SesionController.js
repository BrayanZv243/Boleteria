const { UsuarioDAO } = require('../dataAccess/usuarioDAO');
const { generarToken } = require('../auth/auth');
const { AppError } = require('../utils/appError');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
                if (!usuarioEncontrado || usuarioEncontrado.activa == 'INACTIVA') {
                    return res.status(401).json({ statusCode: 401, mensaje: `Usuario o contraseña incorrectos` });
                }

                // Extraemos el hash y la sal de la contraseña almacenada
                const [hashGuardado, saltGuardado] = usuarioEncontrado.dataValues.contraseña.split(':');
                
                // Comparamos la contraseña proporcionada con el hash y la sal almacenados
                const esContraseñaCorrecta = await bcrypt.compare(contraseña, hashGuardado);

                if (esContraseñaCorrecta) {
                    const token = await generarToken(usuarioEncontrado);
                    res.status(200).json({
                        "message": "Token generado con éxito para usuario " + usuarioEncontrado.tipoUsuario,
                        "token": token
                    });
                } else {
                    res.status(401).json({ statusCode: 401, mensaje: `El correo o contraseña no son correctos.` });
                }
            }

        } catch (error) {
            console.log("Error en controlador sesion: " + error);
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