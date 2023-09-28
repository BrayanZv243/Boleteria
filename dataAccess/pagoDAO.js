const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Pago = models.pagos;

class PagoDAO {
    constructor() {}

    async crearPago(idUsuario, monto, metodo, fecha) {
        try {
            return await Pago.create({ idUsuario, monto, metodo, fecha });
        } catch (error) {
            throw error
        }
    }

    async obtenerPagos() {
        try {
            return await Pago.findAll();
        } catch (error) {
            throw error;
        }
    }

    async obtenerPagoPorId(id) {
        try {
            return await Pago.findByPk(id);
        } catch (error) {
            throw error
        }
    }

    async actualizarPago(idPago, monto, metodo, fecha) {
        try {
            await Pago.update({ monto, metodo, fecha }, { where: { idPago } })
            return await Pago.findByPk(idPago)
        } catch (error) {
            throw error
        }
    }

    async eliminarPago(id) {
        try {
            const pago = await Pago.findByPk(id);
            if (!pago) {
                throw new Error('Usuario no encontrado')
            }
            await pago.destroy();
            return pago;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PagoDAO();