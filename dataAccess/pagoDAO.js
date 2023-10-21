const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Pago = models.pagos;
const Usuario = models.usuarios;

class PagoDAO {
    constructor() {}

   static async crearPago(idUsuario, monto, metodo, fecha) {
        try {
            return await Pago.create({ idUsuario, monto, metodo, fecha });
        } catch (error) {
            throw error
        }
    }

    static async obtenerPagos() {
        try {
            return await Pago.findAll({
                include: {
                    model: Usuario,
                    as: 'idUsuario_usuario'
                }
            });
        } catch (error) {
            throw error;
        }
    }


    static async obtenerPagosPorUsuario(idUsuario) {
        try {
            return await Pago.findAll({
                where:{
                    idUsuario:idUsuario
                },
                include: {
                    model: Usuario,
                    as: 'idUsuario_usuario'
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPagoPorId(id) {
        try {
            return await Pago.findByPk(id);
        } catch (error) {
            throw error
        }
    }

    static async actualizarPago(idPago, monto, metodo, fecha) {
        try {
            await Pago.update({ monto, metodo, fecha }, { where: { idPago } })
            return await Pago.findByPk(idPago)
        } catch (error) {
            throw error
        }
    }

    static  async eliminarPago(id) {
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

module.exports = {PagoDAO};