const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Boleto = models.boletos;
const Evento = models.eventos;
const Asiento = models.asientos;

class BoletoDAO {
    constructor() { }

    static async crearBoleto(boleto) {
        try {
            const { idEvento, idAsiento, precio, estado } = boleto;
            return await Boleto.create({ idEvento, idAsiento, precio, estado });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async obtenerBoletos() {
        try {
            return await Boleto.findAll({
                include: [
                    {
                        model: Evento,
                        as: "idEvento_evento"
                    },
                    {
                        model: Asiento,
                        as: "idAsiento_asiento"
                    }
                ]
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    static async obtenerBoletoPorId(id) {
        try {
            return await Boleto.findByPk(id, {
                include: [
                    {
                        model: Evento, 
                        as: "idEvento_evento" 
                    },
                    {
                        model: Asiento, 
                        as: "idAsiento_asiento" 
                    }
                ]
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    static async obtenerBoletosPorIdEvento(idEvento) {
        try {
            const boletosDeIdEvento = [];
            const respuesta = await Boleto.findAll();
            const boletos = respuesta.map((registro) => registro.toJSON());

            boletos.forEach((boleto) => {
                if (boleto.idEvento === idEvento) {
                    boletosDeIdEvento.push(boleto);
                }
            });
            return boletosDeIdEvento;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async actualizarBoleto(idBoleto, boleto) {
        try {
            const { idEvento, idAsiento, precio, estado } = boleto;
            await Boleto.update({ idEvento, idAsiento, precio, estado }, { where: { idBoleto } });
            return await Boleto.findByPk(idBoleto);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async eliminarBoletoPorId(id) {
        try {
            const boleto = await Boleto.findByPk(id);
            if (!boleto) return null;
            await boleto.destroy();
            return boleto;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = { BoletoDAO };