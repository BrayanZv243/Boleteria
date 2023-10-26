const { PagoDAO } = require('../dataAccess/pagoDAO');
const { UsuarioDAO } = require('../dataAccess/usuarioDAO');
const { CarritoCompraDAO } = require('../dataAccess/carritoCompraDAO');
const { AppError } = require('../utils/appError');

class PagoController {
    static async crearPago(req, res, next) {
        try {
            const { idUsuario, monto, metodo, fecha} = req.body;

            const errores = await PagoController.validarCampos(idUsuario, monto, metodo, fecha);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
                res.status(400).json({ statusCode: 400, message: errores.join(', ') });
            } else {
                const PagoData = { idUsuario, monto, metodo, fecha };
                const pago = await PagoDao.crearPago(PagoData);
                res.status(201).json(pago);
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

    static async obtenerPagos(req, res, next) {
        try {
            const pagos = await PagoDAO.obtenerPagos();
            res.status(200).json(pagos);
        } catch (error) {
            next(new AppError('No se logró obtener los pagos ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró obtener los pagos' });
        }
    }

    static async obtenerPagoPorId(req, res, next) {
        try {
            const id = req.params.id;

            const pago = await PagoDAO.obtenerPagoPorId(id);

            if (pago === null || pago === undefined) {
                next(new AppError('No se encontró el pago', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el pago con el id especificado' });
            } else {
                res.status(200).json(pago);
            }


        } catch (error) {
            next(new AppError('No se logró obtener el pago ', 404));
        }
    }

    static async obtenerPagoPorUsuario(req, res, next) {
        try {
            const id = req.params.id;

            const pago = await PagoDAO.obtenerPagoPorUsuario(id);

            if (pago === null || pago === undefined) {
                next(new AppError('No se encontró el pago', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el pago con el id especificado' });
            } else {
                res.status(200).json(pago);
            }


        } catch (error) {
            next(new AppError('No se logró obtener el pago ', 404));
        }
    }

    static async actualizarPago(req, res, next) {
        try {

            const { idPago, monto, metodo, fecha } = req.body;

            const errores = await PagoController.validarCampos(idPago, monto, metodo, fecha);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                const pago = await PagoDAO.actualizarPago(idPago, monto, metodo, fecha);
                if (pago === null || pago === undefined) {
                    next(new AppError('No se encontró el pago', 404));
                    res.status(404).json({ statusCode: 404, message: 'No se encontró el pago con el id especificado' });
                } else {
                    res.status(200).json(pago);
                }
            }

        } catch (error) {
            next(new AppError('No se pudo actualizar el pago ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró actualizar el pago' });
        }
    }

    static async eliminarPago(req, res, next) {
        try {
            const id = req.params.id;

            const pago = await PagoDAO.eliminarUsuario(id);
            if (pago === null || pago === undefined) {
                next(new AppError('No se encontró el pago', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el pago con el id especificado' });
            } else {
                res.status(200).json(pago);
            }

        } catch (error) {
            next(new AppError('No se pudo eliminar el pago ', 404));
            console.log(error);
        }
    }

    static async validarCampos(monto, metodo, fecha) {
        const errores = [];

        if (!monto || monto.length === 0) {
            errores.push('El monto es obligatorio');
        }

        if (!metodo || metodo.length === 0) {
            errores.push('El metodo es obligatorio');
        }

        if (!fecha || fecha.length === 0) {
            errores.push('La fecha es obligatoria');
        }

        return errores;
    }   
}

module.exports = PagoController;



