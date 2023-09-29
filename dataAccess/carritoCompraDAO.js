const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const CarritoCompra = models.carrito_compra;
const  Boleto  = models.boletos;
const Carrito_compra_has_boletos = models.carrito_compra_has_boletos;


class CarritoCompraDAO {
    constructor() {}

    static async crearCarritoCompra(idUsuario, total) {
        try {
            return await CarritoCompra.create({idUsuario,total});
        } catch (error) {
            throw error
        }
    }

    static async agregarBoletoACarritoCompra(idCarrito_Compra, boletos) {
        // Obtener la longitud del arreglo de boletos
        const longitudBoletos = boletos.length;
        for (let i = 0; i < longitudBoletos; i++) {
            const boleto = boletos[i];
            const idBoleto = boleto.idBoleto;
            await Carrito_compra_has_boletos.create({idCarrito_Compra , idBoleto});
        }
    }

    static async eliminarBoletoACarritoCompra(boletos) {
        // Obtener la longitud del arreglo de boletos
        const longitudBoletos = boletos.length;
        for (let i = 0; i < longitudBoletos; i++) {
            const boleto = boletos[i];
            await boleto.destroy();
        }
        return 'Se elimino correctamente el o los boletos'
    }


    static async actualizarCarritoCompra(idCarrito_Compra, total) {
        try {
            await CarritoCompra.update({ total }, { where: { idCarrito_Compra } })
            return await CarritoCompra.findByPk(idCarrito_Compra)
        } catch (error) {
            throw error
        }
    }

    static async obtenerCarritoCompra() {
        try {
            return await CarritoCompra.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerCarritoCompraPorIdUsuario(idUsuario) {
        try {
            return await CarritoCompra.findOne({
                where:{
                    idUsuario:idUsuario
                }
            });
        } catch (error) {
            throw error
        }
    }
}

module.exports = {CarritoCompraDAO};