const { AsientoDAO } = require('../dataAccess/asientoDAO');
const { AppError } = require('../utils/appError');


class AsientoController {
    static async crearAsiento(req, res, next) {
        try {
            const { tipo, filaYNumero } = req.body;

            const errores = await AsientoController.validarCampos(tipo, filaYNumero);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
                res.status(400).json({ statusCode: 400, message: errores.join(', ') });
            } else {
                const asientoData = { tipo, filaYNumero };
                const asiento = await AsientoDAO.crearAsiento(asientoData);
                res.status(201).json(asiento);
            }

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errores = error.errors.map(err => err.message);
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                next(new AppError('Error al crear el asiento ' + error, 500));
            }
        }
    }

    static async obtenerAsientoPorId(req, res, next) {
        try {
            const id = req.params.id;

            const asiento = await AsientoDAO.obtenerAsientoPorId(id);

            if (asiento === null || asiento === undefined) {
                next(new AppError('No se encontró el asiento', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el asiento con el id especificado' });
            } else {
                res.status(200).json(asiento);
            }


        } catch (error) {
            next(new AppError('No se logró obtener el asiento ', 404));
        }
    }

    static async obtenerAsientos(req, res, next) {
        try {
            const asientos = await AsientoDAO.obtenerAsientos();
            res.status(200).json(asientos);
        } catch (error) {
            next(new AppError('No se logró obtener los asientos ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró obtener los asientos' });
        }
    }

    static async actualizarAsiento(req, res, next) {
        try {
            const id = req.params.id;

            const asientoData = req.body;
            const { tipo, filaYNumero } = req.body;

            const errores = await AsientoController.validarCampos(tipo, filaYNumero);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                const asiento = await AsientoDAO.actualizarAsiento(id, asientoData);
                if (asiento === null || asiento === undefined) {
                    next(new AppError('No se encontró el asiento', 404));
                    res.status(404).json({ statusCode: 404, message: 'No se encontró el asiento con el id especificado' });
                } else {
                    res.status(200).json(asiento);
                }
            }

        } catch (error) {
            next(new AppError('No se pudo actualizar el asiento ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró actualizar el asiento' });
            console.log(error);
        }
    }

    static async eliminarAsiento(req, res, next) {
        try {
            const id = req.params.id;

            const asiento = await AsientoDAO.eliminarAsiento(id);
            if (asiento === null || asiento === undefined) {
                next(new AppError('No se encontró el asiento', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el asiento con el id especificado' });
            } else {
                res.status(200).json(asiento);
            }

        } catch (error) {
            next(new AppError('No puedes eliminar un asiento que le pertenece a un boleto, elimina primero el boleto.', 404));
        }
    }

    static async validarCampos(tipo, filaYNumero) {
        const errores = [];

        if (!tipo || tipo.length === 0) {
            errores.push('El tipo es obligatorio');
        }

        if (!filaYNumero || filaYNumero.length === 0) {
            errores.push('La fila y numero es obligatorio');
        }

        return errores;
    }

}

module.exports = AsientoController;