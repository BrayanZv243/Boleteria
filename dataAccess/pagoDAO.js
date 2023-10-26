const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Pago = models.pagos;
const Usuario = models.usuarios;

class PagoDAO {
    constructor() {}

   static async crearPago(pago) {
        try {
            const { idUsuario, monto, metodo, fecha} = pago;
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


    static async obtenerPagosPorIdUsuario(idUsuario) {
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