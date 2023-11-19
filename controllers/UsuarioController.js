const { UsuarioDAO } = require('../dataAccess/usuarioDAO');
const { CarritoCompraDAO } = require('../dataAccess/carritoCompraDAO');
const { AppError } = require('../utils/appError');
const { generarToken } = require('../auth/auth');

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const total = 0;

class UsuarioController {
    static async crearUsuario(req, res, next) {
        try {
            const { nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña } = req.body;

            const errores = await UsuarioController.validarCampos(nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
                res.status(400).json({ statusCode: 400, message: errores.join(', ') });
            } else {
                const usuarioData = { nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña };
                const usuario = await UsuarioDAO.crearUsuario(usuarioData);
                const idUsuario = usuario.dataValues.idUsuario;
                const carritoCompraData = { idUsuario, total };
                await CarritoCompraDAO.crearCarritoCompra(carritoCompraData);

                const token = await generarToken(usuarioData);

                res.status(201).json({ "usuario": usuario, "token": token });
            }

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errores = error.errors.map(err => err.message);
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                next(new AppError('Error al crear el usuario ' + error, 500));
            }
        }
    }

    static async obtenerUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;

            const usuario = await UsuarioDAO.obtenerUsuarioPorId(id);

            if (usuario === null || usuario === undefined) {
                next(new AppError('No se encontró el usuario', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el usuario con el id especificado' });
            } else {
                res.status(200).json(usuario);
            }


        } catch (error) {
            next(new AppError('No se logró obtener el usuario ', 404));
        }
    }

    static async obtenerUsuarios(req, res, next) {
        try {
            const usuarios = await UsuarioDAO.obtenerUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            next(new AppError('No se logró obtener los usuarios ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró obtener los usuarios' });
        }
    }

    static async actualizarUsuario(req, res, next) {
        try {
            const id = req.params.id;

            const usuarioData = req.body;
            const { nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña } = req.body;

            const errores = await UsuarioController.validarCampos(nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                const usuario = await UsuarioDAO.actualizarUsuario(id, usuarioData);
                if (usuario === null || usuario === undefined) {
                    next(new AppError('No se encontró el usuario', 404));
                    res.status(404).json({ statusCode: 404, message: 'No se encontró el usuario con el id especificado' });
                } else {
                    res.status(200).json(usuario);
                }
            }

        } catch (error) {
            next(new AppError('No se pudo actualizar el usuario ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró actualizar el usuario' });
        }
    }

    static async eliminarUsuario(req, res, next) {
        try {
            const id = req.params.id;

            // Eliminamos primero su carrito de compras.
            const idCarritoCompra = await CarritoCompraDAO.obtenerCarritoCompraPorIdUsuario(id);
            await CarritoCompraDAO.eliminarCarritoCompra(idCarritoCompra.dataValues.idCarrito_Compra);

            const usuario = await UsuarioDAO.eliminarUsuario(id);
            if (usuario === null || usuario === undefined) {
                next(new AppError('No se encontró el usuario', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el usuario con el id especificado' });
            } else {
                res.status(200).json(usuario);
            }

        } catch (error) {
            next(new AppError('No se pudo eliminar el usuario ', 404));
            console.log(error);
        }
    }

    static async validarCampos(nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña) {
        const errores = [];

        if (!nombre || nombre.length === 0) {
            errores.push('El nombre es obligatorio');
        }

        if (!apellido || apellido.length === 0) {
            errores.push('El apellido es obligatorio');
        }

        if (!tipoUsuario || tipoUsuario.length === 0) {
            errores.push('El tipo de usuario es obligatorio');
        }

        if (!edad || edad < 18) {
            errores.push('La edad debe ser mayor o igual a 18');
        }

        if (!telefono || telefono.length === 0) {
            errores.push('El teléfono es obligatorio');
        }

        if (!correo || !regex.test(correo)) {
            errores.push('El correo no es válido');
        }

        if (!contraseña || contraseña.length < 8) {
            errores.push('La contraseña debe tener al menos 8 caracteres');
        }

        return errores;
    }

}

module.exports = UsuarioController;