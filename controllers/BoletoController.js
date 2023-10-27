const { BoletoDAO } = require('../dataAccess/boletoDAO');
const { EventoDAO } = require('../dataAccess/eventoDAO');
const { AsientoDAO } = require('../dataAccess/asientoDAO');
const { AppError } = require('../utils/appError');


class BoletoController {
    static async crearBoleto(req, res, next) {
        try {
            const { idEvento, idAsiento, precio, estado } = req.body;

            const errores = await BoletoController.validarCampos(idEvento, idAsiento, precio, estado);

            // Verificamos que no se repita el idEvento con el idAsiento.
            // Básicamente asegurarnos de que no hayan boletos repetidos.
            const respuestaBoletos = await BoletoDAO.obtenerBoletos();
            const boletos = respuestaBoletos.map(boleto => ({
                idBoleto: boleto.idBoleto,
                idEvento: boleto.idEvento,
                idAsiento: boleto.idAsiento,
                precio: boleto.precio,
                estado: boleto.estado
            }));

            boletos.forEach(boleto => {
                if (boleto.idEvento === idEvento && boleto.idAsiento === idAsiento) {
                    errores.push("No se permiten boletos repetidos. (Boletos en el mismo asiento y evento)");
                    return;
                }
            });

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
                res.status(400).json({ statusCode: 400, message: errores.join(', ') });
            } else {
                const boletoData = { idEvento, idAsiento, precio, estado };
                const boleto = await BoletoDAO.crearBoleto(boletoData);
                const evento = await EventoDAO.obtenerEventoPorId(idEvento);
                evento.dataValues.numBoletosDisponibles++;
                await EventoDAO.actualizarEvento(idEvento, evento);
                res.status(201).json(boleto);
            }

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errores = error.errors.map(err => err.message);
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                next(new AppError('Error al crear el boleto ' + error, 500));
            }
        }
    }

    static async obtenerBoletoPorId(req, res, next) {
        try {
            const id = req.params.id;

            const boleto = await BoletoDAO.obtenerBoletoPorId(id);

            if (boleto === null || boleto === undefined) {
                next(new AppError('No se encontró el boleto', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el boleto con el id especificado' });
            } else {
                res.status(200).json(boleto);
            }


        } catch (error) {
            next(new AppError('No se logró obtener el boleto ', 404));
            console.log(error);
        }
    }

    static async obtenerBoletosPorIdEvento(req, res, next) {
        const id = req.params.id;

        try {
            const boletosPorIdEvento = await BoletoDAO.obtenerBoletosPorIdEvento(id);
            res.status(200).json(boletosPorIdEvento);
        } catch (error) {
            console.log(error);
            res.status(400).json({ statusCode: 400, message: 'No se logró obtener los boletos por id del evento' });
            next(new AppError('No se logró obtener los boletos por id del evento', 404));
        }
    }

    static async obtenerBoletos(req, res, next) {
        try {
            const boletos = await BoletoDAO.obtenerBoletos();
            res.status(200).json(boletos);
        } catch (error) {
            next(new AppError('No se logró obtener los boletos ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró obtener los boletos' });
            console.log(error);
        }
    }

    static async actualizarBoleto(req, res, next) {
        try {
            const id = req.params.id;

            const boletoData = req.body;
            const { idEvento, idAsiento, precio, estado } = req.body;

            const errores = await BoletoController.validarCampos(idEvento, idAsiento, precio, estado);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                const boleto = await BoletoDAO.actualizarBoleto(id, boletoData);
                if (boleto === null || boleto === undefined) {
                    next(new AppError('No se encontró el boleto', 404));
                    res.status(404).json({ statusCode: 404, message: 'No se encontró el boleto con el id especificado' });
                } else {
                    res.status(200).json(boleto);
                }
            }

        } catch (error) {
            next(new AppError('No se pudo actualizar el boleto ', 404));
            res.status(500).json({ statusCode: 500, message: 'No se logró actualizar el boleto' });
            console.log(error);
        }
    }

    static async eliminarBoleto(req, res, next) {
        try {
            const id = req.params.id;

            const boleto = await BoletoDAO.eliminarBoletoPorId(id);
            if (boleto === null || boleto === undefined) {
                next(new AppError('No se encontró el boleto', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el boleto con el id especificado' });
            } else {
                res.status(200).json(boleto);
            }

        } catch (error) {
            next(new AppError('No se pudo eliminar el boleto ', 404));
            console.log(error);
        }
    }

    static async validarCampos(idEvento, idAsiento, precio, estado) {
        const errores = [];

        if (idEvento === undefined || idEvento === null || idEvento === '') {
            errores.push('El campo idEvento es obligatorio.');
        } else if (isNaN(idEvento) || !Number.isInteger(Number(idEvento))) {
            errores.push('El campo idEvento debe ser un número entero.');
        }

        // Verificamos que el evento exista.
        const evento = await EventoDAO.obtenerEventoPorId(idEvento);
        if(!evento) errores.push('El evento debe existir');

        if (idAsiento === undefined || idAsiento === null || idAsiento === '') {
            errores.push('El campo idAsiento es obligatorio.');
        } else if (isNaN(idAsiento) || !Number.isInteger(Number(idAsiento))) {
            errores.push('El campo idAsiento debe ser un número entero.');
        }

        // Verificamos que el asiento exista.
        const asiento = await AsientoDAO.obtenerAsientoPorId(idAsiento);
        if (!asiento) errores.push('El asiento debe existir');


        if (precio === undefined || precio === null || precio === '') {
            errores.push('El campo precio es obligatorio.');
        } else if (isNaN(precio) || typeof precio !== 'number') {
            errores.push('El campo precio debe ser un número.');
        }

        if (estado === undefined || estado === null || estado === '') {
            errores.push('El campo estado es obligatorio.');
        } else if (typeof estado !== 'string' || estado.trim() === '') {
            errores.push('El campo estado no puede estar vacío y debe ser una cadena de caracteres.');
        }

        return errores;
    }

}

module.exports = BoletoController;