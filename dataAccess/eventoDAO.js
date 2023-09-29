const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const {sequelize} = require('../models');
const models = initModels(sequelize);
const Evento = models.eventos;

class EventoDAO {
    constructor() {
    }

    static async crearEvento(nombre, lugar, tipo, fecha, numBoletosVendidos, numBoletosDisponibles) {
        try {
            return await Evento.create({
                nombre,
                lugar,
                tipo,
                fecha,
                numBoletosVendidos,
                numBoletosDisponibles
            });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerEventoPorId(id) {
        try {

            return await Evento.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    static async actualizarEvento(idEvento, nombre, lugar, tipo, fecha, boletos_vendidos, boletos_disponibles ) {
        try {
             await Evento.update({
                nombre,
                lugar,
                tipo,
                fecha,
                boletos_vendidos,
                boletos_disponibles
            }, {
                where: { idEvento },
                 // Para obtener el objeto actualizado
            });





            return await Evento.findByPk(idEvento)
        } catch (error) {
            throw error;
        }
    }


    static async eliminarEvento(id) {
        try {
            const evento = await Evento.findByPk(id);
            if (!evento) {
                throw new Error('Evento no encontrado');
            }

            await evento.destroy();
            return "Evento Eliminado con éxito";
        } catch (error) {
            throw error;
        }
    }

    static async obtenerTodosEventos() {
        try {
            const eventos = await Evento.findAll();
            return eventos;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = {EventoDAO};
