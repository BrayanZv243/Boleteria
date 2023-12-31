const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Compras = models.compras;
const Compras_has_boletos = models.compras_has_boletos;
const Pago = models.pagos;
const Boleto = models.boletos;
const Evento = models.eventos;

class CompraDAO {
    constructor() { }

    static async crearCompra(compraData) {
        try {
            const { idPago, total, boletos } = compraData;
            let compra = await Compras.create({ idPago, total });
            const idCompra = compra.idCompra;

            for (let i = 0; i < boletos.length; i++) {
                const boleto = boletos[i];

                const idBoleto = boleto.idBoleto;
                await Compras_has_boletos.create({ idCompra, idBoleto });
            }

        } catch (error) {
            console.log(error);
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
                    }
                ]
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async obtenerTodosLosBoletosComprados() {
        try {
            return await Compras_has_boletos.findAll({
                include: [
                    {
                        model: Boleto, // Incluye el modelo Boleto
                        as: 'idBoleto_boleto',
                        include: [
                            {
                                model: Evento,
                                as: 'idEvento_evento' // Incluye otros modelos asociados con Compras si es necesario
                            }
                        ]
                    }
                ]
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = { CompraDAO };