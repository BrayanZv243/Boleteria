const { CompraDAO } = require('../dataAccess/compraDAO');
const { AppError } = require('../utils/appError');

class ComprasController {
    static async crearCompra(req, res, next) {
        try {
            // Suponiendo que los datos necesarios para crear una compra se encuentren en req.body
            const { idUsuario, monto, boletos } = req.body;

            // Validar los campos 
            const errores = await ComprasController.validarCampos(idUsuario, monto, boletos);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
                res.status(400).json({ statusCode: 400, message: errores.join(', ') });
            } else {
                // Crear un objeto de datos de compra
                const compraData = { idUsuario, monto, boletos };

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
            const compras = await CompraDAO.obtenerCompras();
            res.status(200).json(compras);
        } catch (error) {
            next(new AppError('No se logró obtener las compras', 404));
            res.status(404).json({ statusCode: 404, message: 'No se logró obtener las compras' });
        }
    }

    static async validarCampos(idUsuario, monto, boletos) {
        const errores = [];

        if (typeof idUsuario !== 'number') {
            errores.push('El usuarioId debe ser un número.');
        }

        if (typeof idUsuario !== 'number') {
            errores.push('El idUsuario debe ser un número.');
        }

        if (typeof monto !== 'number' || monto <= 0) {
            errores.push('El monto debe ser un número mayor que cero.');
        }

        if (!Array.isArray(boletos) || boletos.length === 0) {
            errores.push('El grupo de boletos debe ser un arreglo no vacío.');
        } else {
            // Puedes agregar más validaciones específicas para el grupo de boletos si es necesario
        }

        return errores;
    }
}

module.exports = ComprasController;




