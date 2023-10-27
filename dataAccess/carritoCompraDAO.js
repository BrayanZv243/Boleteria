const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const CarritoCompra = models.carrito_compra;
const Usuario = models.usuarios;
const Carrito_compra_has_boletos = models.carrito_compra_has_boletos;
const Boleto = models.boletos;

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

    static async eliminarBoletosDeCarritoCompra(idCarrito_Compra, boletos) {
        try {
            for (let i = 0; i < boletos.length; i++) {
                const boleto = boletos[i];
                const idBoleto = boleto.idBoleto;

                // Busca el registro en la tabla Carrito_compra_has_boletos y elimínalo
                await Carrito_compra_has_boletos.destroy({ where: { idCarrito_Compra, idBoleto } });
            }
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
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
            return await CarritoCompra.findAll({
                include: [{
                    model: Usuario,
                    as: "idUsuario_usuario"
                }]
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async obtenerBoletosDeUnCarritoCompra(idCarritoCompra) {
        try {
            const boletosDeCarritoCompra = [];
            const respuesta = await Carrito_compra_has_boletos.findAll({
                include:{
                    model: Boleto,
                    as: "idBoleto_boleto"
                }
            });
            const boletos = respuesta.map((registro) => registro.toJSON());
            boletos.forEach((boleto) => {
                if (boleto.idCarrito_Compra == idCarritoCompra) {
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
            const boletosDelCarritoAEliminar = await CarritoCompraDAO.obtenerBoletosDeUnCarritoCompra(id);
            await CarritoCompraDAO.eliminarBoletosDeCarritoCompra(id, boletosDelCarritoAEliminar);
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