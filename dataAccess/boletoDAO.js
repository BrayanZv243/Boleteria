const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Boleto = models.boletos;
const Evento = models.eventos;
const Asiento = models.asientos;

class BoletoDAO {
    constructor() { }

    static async crearBoleto(boletos) {
        try {
            const { idEvento, asientos, precio, estado, numBoletosDisponibles } = boletos;
            for (let i = 0; i < numBoletosDisponibles; i++) {
                const idAsiento = asientos[i].idAsiento;
                await Boleto.create({ idEvento, idAsiento, precio, estado });
            }

            return boletos;

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
                if (boleto.idEvento === parseInt(idEvento)) {
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
            await Boleto.update({ idAsiento, precio, estado }, { where: { idEvento }, multi: true });
            return await Boleto.findByPk(idBoleto);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async actualizarBoletoAVendido(idBoleto, boleto) {
        try {
            const { estado } = boleto;
            await Boleto.update({ estado }, { where: { idBoleto }});
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

    static async eliminarBoletosPorIdEvento(idEvento) {
        try {
            const boletos = await Boleto.findAll({
                where: { idEvento },
            });

            if (!boletos || boletos.length === 0) {
                console.log('No se encontraron boletos para el evento con idEvento:', idEvento);
                return null;
            }

            // Eliminar cada boleto encontrado
            for (const boleto of boletos) {
                await boleto.destroy();
            }

            console.log(`Boletos eliminados correctamente para el evento con idEvento: ${idEvento}`);
            return boletos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = { BoletoDAO };