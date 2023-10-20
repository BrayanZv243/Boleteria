const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Boleto = models.boletos;

class BoletoDAO {
    constructor() {}

    static async crearBoleto(boleto) {
        try {
            const { idEvento, idAsiento, precio, estado } = boleto
            return await Boleto.create({ idEvento, idAsiento, precio, estado });
        } catch (error) {
            throw error
        }
    }

    static  async obtenerBoleto() {
        try {
            return await Boleto.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerBoletoPorId(id) {
        try {
            return await Boleto.findByPk(id);
        } catch (error) {
            throw error
        }
    }

    static async actualizarBoleto(idBoleto, precio, estado) {
        try {
            await Boleto.update({ precio, estado }, { where: { idBoleto } })
            return await Boleto.findByPk(idUsuario)
        } catch (error) {
            throw error
        }
    }

    static async eliminarBoleto(id) {
        try {
            const boleto = await Boleto.findByPk(id);
            if (!boleto) return null;
            await boleto.destroy();
            return boleto;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {BoletoDAO};