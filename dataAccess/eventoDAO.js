const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Evento = models.eventos;

class EventoDAO {
    constructor() {
    }

    static async crearEvento(evento) {
        try {
            const { nombre, lugar, tipo, fecha, numBoletosVendidos, numBoletosDisponibles } = evento;
            return await Evento.create({
                nombre,
                lugar,
                tipo,
                fecha,
                numBoletosVendidos,
                numBoletosDisponibles
            });
        } catch (error) {
            console.log(error);
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

    static async actualizarEvento(idEvento, evento) {
        try {
            const { nombre, lugar, tipo, fecha, numBoletosVendidos, numBoletosDisponibles } = evento;
            await Evento.update({
                nombre,
                lugar,
                tipo,
                fecha,
                numBoletosVendidos,
                numBoletosDisponibles
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
            if (!evento) return null;
            await evento.destroy();
            return evento;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerEventos() {
        try {
            const eventos = await Evento.findAll();
            return eventos;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = { EventoDAO };
