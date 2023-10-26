const { PagoDAO } = require('../dataAccess/pagoDAO');
const { UsuarioDAO } = require('../dataAccess/usuarioDAO');
const { AppError } = require('../utils/appError');
const regexFechaMySQL = /^(?:\d{4}-\d{1,2}-\d{1,2})$/;

class PagoController {
    static async crearPago(req, res, next) {
        try {
            const { idUsuario, monto, metodo, fecha } = req.body;

            const errores = await PagoController.validarCampos(idUsuario, monto, metodo, fecha);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
                res.status(400).json({ statusCode: 400, message: errores.join(', ') });
            } else {
                const PagoData = { idUsuario, monto, metodo, fecha };
                const pago = await PagoDAO.crearPago(PagoData);
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

    static async obtenerPagosPorIdUsuario(req, res, next) {
        try {
            const id = req.params.id;

            // Validamos que el usuario exista.
            const usuario = await UsuarioDAO.obtenerUsuarioPorId(id);

            if(!usuario){
                res.status(404).json({ statusCode: 404, message: 'No se encontró el usuario con el id especificado' });
            }

            const pago = await PagoDAO.obtenerPagosPorIdUsuario(id);

            if (pago === null || pago === undefined) {
                next(new AppError('No se encontró el pago', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el pago con el id especificado' });
            } else {
                res.status(200).json(pago);
            }


        } catch (error) {
            next(new AppError('No se logró obtener el pago ', 404));
            console.log(error);
        }
    }

    static async eliminarPago(req, res, next) {
        try {
            const id = req.params.id;

            // Validamos que el pago exista.
            const pagoExists = await PagoDAO.obtenerPagoPorId(id);

            if(!pagoExists){
                res.status(404).json({ statusCode: 404, message: 'No se encontró el pago con el id especificado' });
            }
            
            const pago = await PagoDAO.eliminarPago(id);
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

    static async validarCampos(idUsuario, monto, metodo, fecha) {
        const errores = [];

        if (!idUsuario || idUsuario.length === 0) {
            errores.push('El idUsuario es obligatorio');
        }

        if (!monto || monto.length === 0) {
            errores.push('El monto es obligatorio');
        }

        if (!metodo || metodo.length === 0) {
            errores.push('El metodo es obligatorio');
        }

        if (!fecha || fecha.length === 0) {
            errores.push('La fecha es obligatoria');
        }


        const fechaActual = new Date();
        const fechaIngresada = new Date(fecha);
        fechaActual.setDate(fechaActual.getDate() - 1);
        fechaIngresada.setHours(0, 0, 0, 0);
        fechaActual.setHours(0, 0, 0, 0);


        // Comprobamos si el año y el mes son iguales o posteriores
        if (fechaIngresada < fechaActual) {
            errores.push('La fecha no puede ser anterior a la fecha actual.');
        } else if (fechaIngresada > fechaActual) {
            errores.push('La fecha no puede ser posterior a la fecha actual.');
        }
        console.log(fechaActual)
        console.log(fechaIngresada)

        if (!regexFechaMySQL.test(fecha)) {
            errores.push('Formato de fecha inválida, pruebe con yyyy-mm-dd');
        }

        return errores;
    }
}

module.exports = PagoController;



