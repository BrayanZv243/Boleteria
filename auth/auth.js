const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './variables.env' });
const secretKey = process.env.LLAVESECRETA;

async function verificarToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }
    token = token.split(' ')[1];
    jwt.verify(token, secretKey, (error, usuario) => {
        if (error) {
            return res.status(403).json({ statusCode: 403, mensaje: 'Token inválido' });
        }
        // El token es válido, adjuntamos el usuario a la solicitud
        req.usuario = usuario;
        next();
    });
}

function verificarRolAdmin(rolRequerido) {
    return (req, res, next) => {
        const usuario = req.usuario;
        if (usuario && usuario.rol === rolRequerido) {
            next(); // El usuario tiene el rol requerido, continúa
        } else {
            res.status(403).json({ mensaje: 'Acceso no autorizado a usuarios de tipo ' + usuario.rol });
        }
    };
}

// Método para generar un token JWT
async function generarToken(usuario) {
    const payload = {
        idUsuario: usuario.idUsuario,
        rol: usuario.tipoUsuario
    };

    // Generar el token con el payload y la clave secreta
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Cambia el tiempo de expiración según tus necesidades

    return token;
}

module.exports = {
    verificarToken,
    generarToken,
    verificarRolAdmin
};
