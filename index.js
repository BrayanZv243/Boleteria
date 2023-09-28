const { sequelize } = require('./models');
const UsuarioDAO = require('./dataAccess/usuarioDAO');
const { Usuario } = require('./entitys/usuario');
const { Boleto } = require('./entitys/boleto');
const BoletoDAO = require('./dataAccess/boletoDAO');
const PagoDAO = require('./dataAccess/pagoDAO');
const { Pago } = require('./entitys/pago');
const AsientoDAO = require('./dataAccess/asientoDAO');
const { Asiento } = require('./entitys/asiento');
const asientoDAO = require('./dataAccess/asientoDAO');
const boletoDAO = require('./dataAccess/boletoDAO');



async function realizarTransacciones() {

    // Transacciones para Usuario terminadas
    // Hagan las transacciones que faltan :)
    try {
        await sequelize.sync()
        
        try {

            //   console.log('--------CREAMOS UN ASIENTO--------')
            //   const nuevoAsiento = new Asiento(
            //       "VIP",
            //       "B33"
            //   );

            // console.log('--------CREAMOS UN ASIENTO--------')
            //    const nuevoBoleto = new Boleto(
            //        1,
            //        1,
            //        200.0,
            //        "Ocupado"
            //    );

            //  console.log('--------CREAMOS TRES PAGOS--------')
            //  const nuevoPago = new Pago(
            //      2,
            //      20.0,
            //      "Tarjeta",
            //      "2023-08-1",
            //  );

            //  const nuevoPago2 = new Pago(
            //     3,
            //     20.0,
            //     "Tarjeta",
            //     "2023-08-1",
            //  );

            // const nuevoPago3 = new Pago(
            //      4,
            //      20.0,
            //      "Tarjeta",
            //      "2023-08-1",
            //  );


            //   await asientoDAO.crearAsiento(
            //       nuevoAsiento.tipo,
            //       nuevoAsiento.filaYNumero,
                  
            //   );

            //   await BoletoDAO.crearBoleto(
            //      nuevoBoleto.idEvento,
            //      nuevoBoleto.idAsiento,
            //      nuevoBoleto.precio,
            //      nuevoBoleto.estado
            //   );

            //  await PagoDAO.crearPago(
            //     nuevoPago3.idUsuario,
            //     nuevoPago.monto,
            //     nuevoPago.metodo,
            //     nuevoPago.fecha
            //  );
            //  console.log('Pagos creados con éxito')

            //   console.log('--------CONSULTAMOS TODOS LOS PAGOS--------')
            //   const payments = await pagoDAO.obtenerPagos();
            //   console.log('Pagos: ', payments)

               console.log('--------CONSULTAMOS UN BOLETOS POR ID 1--------')
            
               const boletoEncontrado = await boletoDAO.obtenerBoletoPorId(1);
               console.log('Boleto Encontrado: ', boletoEncontrado)

            //   console.log('--------ACTUALIZAMOS UN USUARIO POR ID 5--------')

            //   const pagoActualizado = await pagoDAO.actualizarPago(
            //           5,
            //           25.0,
            //           "Efectivo",
            //           "2023-08-1",
            //       );
            //   console.log('Pago Actualizado: ', pagoActualizado)

            //  console.log('--------ELIMINAMOS EL USUARIO CON ID 11--------') // Solo sirve una vez, ya que elimina el usuario
            //  const pagoEliminado = await pagoDAO.eliminarPago(10);
            //  console.log('Pago Eliminado: ', pagoEliminado)
            


        } catch (error) {
            throw error;
        }        

    } catch (error) {
        console.error('Error en las transacciones: ' + error)
    } finally {
        // Cerramos la conexión a la base de datos cuando todo haya terminado.
        await sequelize.close();
    }
}

// Ejecutamos las transacciones
realizarTransacciones();