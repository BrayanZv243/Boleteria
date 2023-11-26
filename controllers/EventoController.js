const { EventoDAO } = require('../dataAccess/eventoDAO');
const { AsientoDAO } = require('../dataAccess/asientoDAO');
const { AppError } = require('../utils/appError');

const numBoletosVendidos = 0;


class EventoController {
    static async crearEvento(req, res, next) {
        try {
            const { nombre, lugar, tipo, fecha, numBoletosDisponibles, nombreImagen } = req.body;

            const errores = await EventoController.validarCampos(nombre, lugar, tipo, fecha, numBoletosDisponibles);

            const eventos = await EventoDAO.obtenerEventos();
            let eventoExiste = false;
            let imagenExiste = false;

            eventos.some(evento => {
                eventoExiste = evento.nombre === nombre;
                imagenExiste = evento.nombreImagen === nombreImagen;

                // Si ambas condiciones son verdaderas, no es necesario seguir iterando
                return eventoExiste && imagenExiste;
            });

            if (eventoExiste) {
                errores.push('Un evento con ese nombre ya existe');
            }

            if (imagenExiste) {
                errores.push('Una imagen con ese nombre ya existe');
            }

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                const eventoData = { nombre, lugar, tipo, fecha, numBoletosVendidos, numBoletosDisponibles, nombreImagen };
                const evento = await EventoDAO.crearEvento(eventoData);
                res.status(200).json(evento);
            }

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errores = error.errors.map(err => err.message);
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                next(new AppError('Error al crear el evento ' + error, 500));
            }
        }
    }

    static async obtenerEventoPorId(req, res, next) {
        try {
            const id = req.params.id;

            const evento = await EventoDAO.obtenerEventoPorId(id);

            if (evento === null || evento === undefined) {
                next(new AppError('No se encontró el evento', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el evento con el id especificado' });
            } else {
                res.status(200).json(evento);
            }


        } catch (error) {
            next(new AppError('No se logró obtener el evento ', 404));
        }
    }

    static async obtenerEventos(req, res, next) {
        try {
            const eventos = await EventoDAO.obtenerEventos();
            res.status(200).json(eventos);
        } catch (error) {
            next(new AppError('No se logró obtener los eventos ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró obtener los eventos' });
        }
    }

    static async actualizarEvento(req, res, next) {
        try {
            const id = req.params.id;

            const eventoData = req.body;
            const { nombre, lugar, tipo, fecha, numBoletosVendidos, numBoletosDisponibles, nombreImagen } = req.body;

            const errores = await EventoController.validarCampos(nombre, lugar, tipo, fecha, numBoletosDisponibles);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                const evento = await EventoDAO.actualizarEvento(id, eventoData);
                if (evento === null || evento === undefined) {
                    next(new AppError('No se encontró el evento', 404));
                } else {
                    res.status(200).json(evento);
                }
            }

        } catch (error) {
            next(new AppError('No se pudo actualizar el evento ', 404));
            console.log(error);
        }
    }

    static async eliminarEvento(req, res, next) {
        try {
            const id = req.params.id;

            const evento = await EventoDAO.eliminarEvento(id);
            if (evento === null || evento === undefined) {
                next(new AppError('No se encontró el evento', 404));
            } else {
                res.status(200).json(evento);
            }

        } catch (error) {
            next(new AppError('No se pudo eliminar el evento ' + error, 404));
        }
    }

    static async validarCampos(nombre, lugar, tipo, fecha, numBoletosDisponibles) {
        const errores = [];

        if (!nombre || typeof nombre !== 'string') {
            errores.push('El campo "nombre" es obligatorio y debe ser un String.');
        }

        if (!lugar || typeof lugar !== 'string') {
            errores.push('El campo "lugar" es obligatorio y debe ser un String.');
        }

        if (!tipo || typeof tipo !== 'string') {
            errores.push('El campo "tipo" es obligatorio y debe ser un String.');
        }

        if (typeof fecha !== 'undefined') {
            const fechaActual = new Date();
            const fechaIngresada = new Date(fecha);

            // Comprobamos si el año y el mes son iguales o posteriores
            if (fechaIngresada.getFullYear() < fechaActual.getFullYear() ||
                (fechaIngresada.getFullYear() === fechaActual.getFullYear() && fechaIngresada.getMonth() < fechaActual.getMonth())) {
                errores.push('La fecha no puede ser anterior a la fecha actual.');
            }

            // Luego, comprobamos si el día es igual o posterior
            if (fechaIngresada.getFullYear() === fechaActual.getFullYear() &&
                fechaIngresada.getMonth() === fechaActual.getMonth() &&
                fechaIngresada.getDate() + 1 < fechaActual.getDate()) {
                errores.push('La fecha no puede ser anterior a la fecha actual.');
            }
        }

        // Validar numBoletosDisponibles
        if (typeof numBoletosDisponibles !== 'number' || isNaN(numBoletosDisponibles) || numBoletosDisponibles <= 0) {
            errores.push('El campo "numBoletosDisponibles" debe ser un número positivo.');
        }

        // Validamos que el numBolestosDisponibles no pueda ser mayor al número de asientos registrados.
        // Obtenemos los asientos.
        const asientos = await AsientoDAO.obtenerAsientos();
        if(numBoletosDisponibles > asientos.length){
            errores.push(`No puedes registrar más asientos de los que hay (${asientos.length}). Intenta con menos.`);
        }

        return errores;
    }

}

module.exports = EventoController;