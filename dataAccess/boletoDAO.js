const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Boleto = models.boletos;

class BoletoDAO {
    constructor() {}

    async crearBoleto(idEvento, idAsiento, precio, estado) {
        try {
            return await Boleto.create({ idEvento, idAsiento, precio, estado });
        } catch (error) {
            throw error
        }
    }

    async obtenerBoleto() {
        try {
            return await Boleto.findAll();
        } catch (error) {
            throw error;
        }
    }

    async obtenerBoletoPorId(id) {
        try {
            return await Boleto.findByPk(id);
        } catch (error) {
            throw error
        }
    }

    async actualizarBoleto(idBoleto, precio, estado) {
        try {
            await Boleto.update({ precio, estado }, { where: { idBoleto } })
            return await Boleto.findByPk(idUsuario)
        } catch (error) {
            throw error
        }
    }

    async eliminarBoleto(id) {
        try {
            const boleto = await Boleto.findByPk(id);
            if (!boleto) {
                throw new Error('Boleto no encontrado')
            }
            await boleto.destroy();
            return boleto;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BoletoDAO();