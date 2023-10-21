const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const CarritoCompra = models.carrito_compra;
const Carrito_compra_has_boletos = models.carrito_compra_has_boletos;

class CarritoCompraDAO {
    constructor() { }

    static async crearCarritoCompra(carritoCompra) {
        try {
            const { idUsuario, total } = carritoCompra;
            return await CarritoCompra.create({ idUsuario, total });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async obtenerCarritoCompraPorId(idCarrito_Compra){
        try {
            return await CarritoCompra.findByPk(idCarrito_Compra);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async agregarBoletoACarritoCompra(idCarrito_Compra, boletos) {
        try {
            for (let i = 0; i < boletos.length; i++) {
                const boleto = boletos[i];
                const idBoleto = boleto.idBoleto;
                await Carrito_compra_has_boletos.create({ idCarrito_Compra, idBoleto });
            }
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async eliminarBoletoACarritoCompra(boletos) {
        try {
            for (let i = 0; i < boletos.length; i++) {
                const boleto = boletos[i];
                await boleto.destroy();
            }
            return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }


    static async actualizarCarritoCompra(idCarrito_Compra, total) {
        try {
            await CarritoCompra.update({ total }, { where: { idCarrito_Compra } })
            return await CarritoCompra.findByPk(idCarrito_Compra);
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    static async obtenerCarritosCompra() {
        try {
            return await CarritoCompra.findAll();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async obtenerBoletosDeUnCarritoCompra(idCarritoCompra) {
        try {
            const boletosDeCarritoCompra = [];
            const respuesta = await Carrito_compra_has_boletos.findAll();
            const boletos = respuesta.map((registro) => registro.toJSON());

            boletos.forEach((boleto) => {
                if (boleto.idCarrito_Compra === idCarritoCompra) {
                    boletosDeCarritoCompra.push(boleto);
                }
            });
            return boletosDeCarritoCompra;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async obtenerCarritoCompraPorIdUsuario(idUsuario) {
        try {
            return await CarritoCompra.findOne({
                where: {
                    idUsuario: idUsuario
                }
            });
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    static async eliminarCarritoCompra(id) {
        try {

            const boletosDelCarritoAEliminar = this.obtenerBoletosDeUnCarritoCompra(id);
            this.eliminarBoletoACarritoCompra(boletosDelCarritoAEliminar);

            const carritoCompra = await CarritoCompra.findByPk(id);
            if (!carritoCompra) return null;
            await carritoCompra.destroy();
            return carritoCompra;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = { CarritoCompraDAO };