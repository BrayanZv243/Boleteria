const { UsuarioDAO } = require('../dataAccess/usuarioDAO');
const { CarritoCompraDAO } = require('../dataAccess/carritoCompraDAO');
const { AppError } = require('../utils/appError');
const { generarToken } = require('../auth/auth');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const total = 0;

class UsuarioController {
    static async crearUsuario(req, res, next) {
        try {
            const { nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña } = req.body;

            const errores = await UsuarioController.validarCampos(nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                // Generar una sal única
                
                const salt = await bcrypt.genSalt(saltRounds);

                // Concatenar la contraseña con la sal
                const passwordWithSalt = `${contraseña}:${salt}`;

                // Aplicar una función hash a la combinación de contraseña y sal
                const hash = await bcrypt.hash(passwordWithSalt, saltRounds);

                // Almacenar el hash y la sal en el formato deseado
                const usuarioData = { nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña: `${hash}:${salt}` };
                const usuario = await UsuarioDAO.crearUsuario(usuarioData);

                // Crear carrito de compra para el usuario
                const idUsuario = usuario.dataValues.idUsuario;
                const carritoCompraData = { idUsuario, total };
                await CarritoCompraDAO.crearCarritoCompra(carritoCompraData);

                // Generar token para el usuario
                usuarioData.idUsuario = idUsuario;
                const token = await generarToken(usuarioData);

                // Responder con la respuesta y el token
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
            const { nombre, apellido, edad, telefono, correo, contraseñaAntigua, nuevaContraseña } = req.body;

            // Validamos los datos
            const errores = await UsuarioController.validarCampos(nombre, apellido, 'tipoUsuario', edad, telefono, correo, nuevaContraseña);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                // Obtenemos el usuario por su ID
                const usuario = await UsuarioDAO.obtenerUsuarioPorId(id);

                if (!usuario) {
                    next(new AppError('No se encontró el usuario', 404));
                    res.status(404).json({ statusCode: 404, message: 'No se encontró el usuario con el ID especificado' });
                } else {
                    // Extraemos el hash y la sal de la contraseña almacenada
                    const [hashGuardado, saltGuardado] = usuario.dataValues.contraseña.split(':');

                    // Comparamos la contraseña antigua proporcionada con el hash y la sal almacenados
                    const esContraseñaAntiguaCorrecta = await bcrypt.compare(contraseñaAntigua, hashGuardado);

                    if (esContraseñaAntiguaCorrecta) {
                        // Generamos la sal y el hash de la nueva contraseña
                        const salt = await bcrypt.genSalt(saltRounds);
                        const hash = await bcrypt.hash(nuevaContraseña, salt);

                        const usuarioData = { nombre, apellido, edad, telefono, correo, contraseña: `${hash}:${salt}` };

                        // Actualizamos el usuario con los nuevos datos
                        const usuarioActualizado = await UsuarioDAO.actualizarUsuario(id, usuarioData);

                        res.status(200).json(usuarioActualizado);
                    } else {
                        // La contraseña antigua no coincide
                        res.status(401).json({ statusCode: 401, message: 'La contraseña antigua proporcionada no es correcta' });
                    }
                }
            }

        } catch (error) {
            console.log(error);
            res.status(400).json({ statusCode: 500, message: 'No se logró actualizar el usuario' });
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
        const regexLetras = /^[a-zA-Z]+$/;
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regexTelefono = /^\d{10}$/;

        if (!nombre || nombre.length === 0 || !regexLetras.test(nombre)) {
            errores.push('El nombre es obligatorio');
        }

        if (!apellido || apellido.length === 0 || !regexLetras.test(apellido)) {
            errores.push('El apellido es obligatorio');
        }

        if (!tipoUsuario || tipoUsuario.length === 0) {
            errores.push('El tipo de usuario es obligatorio');
        }

        if (!edad || edad > 150 || !Number.isInteger(edad)) {
            errores.push('Ingrese una edad válida');
        }

        if (!telefono || telefono.length === 0 || telefono.length > 10) {
            errores.push('El teléfono es obligatorio');
        }

        if(!regexTelefono.test(telefono)){
            errores.push('Ingrese un teléfono válido de 10 números');
        }

        if (!correo || !regexCorreo.test(correo)) {
            errores.push('El correo no es válido');
        }

        const usuarioEncontrado = await UsuarioDAO.obtenerUsuarioPorCorreo(correo);
        if(usuarioEncontrado) {
            errores.push(`El correo ${correo} ya existe en nuestra Boletería.`);
        }

        if (!contraseña || contraseña.length < 8) {
            errores.push('La contraseña debe tener al menos 8 caracteres');
        }

        return errores;
    }

}

module.exports = UsuarioController;