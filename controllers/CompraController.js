
const { CompraDAO } = require('../dataAccess/compraDAO');
const { AppError } = require('../utils/appError');

class ComprasController {
    static async crearCompra(req, res, next) {
        try {
            // Suponiendo que los datos necesarios para crear una compra se encuentren en req.body
            const { usuarioId, productoId, total, grupoBoletos } = req.body;

            // Validar los campos (puedes crear una función de validación similar a la que usas para los asientos)
            const errores = await ComprasController.validarCampos(usuarioId, productoId, total, grupoBoletos);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                // Crear un objeto de datos de compra
                const compraData = { usuarioId, productoId, total, grupoBoletos };

                // Llamar a la función para crear una compra en la capa de acceso a datos (DAO)
                const compra = await CompraDAO.crearCompra(compraData);

                // Responder con el objeto de compra creado
                res.status(201).json(compra);
            }
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errores = error.errors.map(err => err.message);
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                next(new AppError('Error al crear la compra: ' + error, 500));
            }
        }
    }

    static async obtenerCompras(req, res, next) {
        try {
            const compras = await CompraDAO.obtenerCompras(); // Suponiendo que tengas una función obtenerCompras en tu DAO
            res.status(200).json(compras);
        } catch (error) {
            next(new AppError('No se logró obtener las compras', 404));
            res.status(404).json({ statusCode: 404, message: 'No se logró obtener las compras' });
        }
    }

    // Puedes definir una función de validación similar a la de AsientoController aquí
    static async validarCampos(usuarioId, productoId, total, grupoBoletos) {
        // Implementa tu lógica de validación de campos aquí
        // Puedes usar condiciones y reglas específicas para validar los campos
        const errores = [];

        // Ejemplo de validación: si usuarioId no es un número
        if (typeof usuarioId !== 'number') {
            errores.push('El usuarioId debe ser un número.');
        }

        // Agrega más validaciones según tus necesidades

        return errores;
    }
    static async validarCampos(usuarioId, productoId, total, grupoBoletos) {
        const errores = [];

        if (typeof usuarioId !== 'number') {
            errores.push('El usuarioId debe ser un número.');
        }

        if (typeof productoId !== 'number') {
            errores.push('El productoId debe ser un número.');
        }

        if (typeof total !== 'number' || total <= 0) {
            errores.push('El total debe ser un número mayor que cero.');
        }

        if (!Array.isArray(grupoBoletos) || grupoBoletos.length === 0) {
            errores.push('El grupo de boletos debe ser un arreglo no vacío.');
        } else {
            // Puedes agregar más validaciones específicas para el grupo de boletos si es necesario
        }

        return errores;
    }
}

module.exports = ComprasController;




