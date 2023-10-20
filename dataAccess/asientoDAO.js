const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Asiento = models.asientos;

class AsientoDAO {
    constructor() { }

    static async crearAsiento(asiento) {
        try {
            const { tipo, filaYNumero } = asiento
            return await Asiento.create({ tipo, filaYNumero });
        } catch (error) {
            throw error
        }
    }

    static async obtenerAsientos() {
        try {
            return await Asiento.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerAsientoPorId(id) {
        try {
            return await Asiento.findByPk(id);
        } catch (error) {
            throw error
        }
    }

    static async actualizarAsiento(idAsiento, asiento) {
        try {
            const { tipo, filaYNumero } = asiento;
            await Asiento.update({ tipo, filaYNumero }, { where: { idAsiento } })
            return await Asiento.findByPk(idAsiento);
        } catch (error) {
            throw error
        }
    }

    static async eliminarAsiento(id) {
        try {
            const asiento = await Asiento.findByPk(id);
            if (!asiento) {
                return null;
            }
            await asiento.destroy();
            return asiento;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { AsientoDAO };