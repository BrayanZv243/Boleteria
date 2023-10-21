const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Compras = models.compras;
const Compras_has_boletos = models.compras_has_boletos;
const Pago = models.pagos;
const Evento = models.eventos;

class CompraDAO {
    constructor() { }

    static async crearCompra(idPago, idEvento, total, boletos) {
        try {

            let compra = await Compras.create({ idPago, idEvento, total });
            const idCompra = compra.idCompra;

            for (let i = 0; i < boletos.length; i++) {
                const boleto = boletos[i];

                const idBoleto = boleto.idBoleto;
                await Compras_has_boletos.create({ idCompra, idBoleto });
            }

        } catch (error) {
            throw error
        }
    }

    static async obtenerCompras() {
        try {
            return await Compras.findAll({
                include: [
                    {
                        model: Pago,
                        as: 'idPago_pago'
                    },
                    {
                        model: Evento,
                        as: 'idEvento_evento'
                    }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

}

module.exports = { CompraDAO };