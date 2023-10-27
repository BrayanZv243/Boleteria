const { CarritoCompraDAO } = require('../dataAccess/carritoCompraDAO');
const UsuarioController = require('../controllers/UsuarioController');
const { AppError } = require('../utils/appError');
const { BoletoDAO } = require('../dataAccess/boletoDAO');


class CarritoCompraController {
    static async crearCarritoCompra(req, res, next) {
        try {
            const { idUsuario, total } = req.body;

            const errores = await CarritoCompraController.validarCampos(idUsuario, total);

            if (errores.length > 0) {
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
                res.status(400).json({ statusCode: 400, message: errores.join(', ') });
            } else {
                const carritoCompraData = { idUsuario, total };
                const carritoCompra = await CarritoCompraDAO.crearCarritoCompra(carritoCompraData);
                res.status(201).json(carritoCompra);
            }

        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errores = error.errors.map(err => err.message);
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                next(new AppError('Error al crear el carrito compra ' + error, 500));
            }
        }
    }

    static async obtenerCarritoCompraPorId(req, res, next) {
        try {
            const id = req.params.id;

            const carritoCompra = await CarritoCompraDAO.obtenerCarritoCompraPorId(id);

            if (carritoCompra === null || carritoCompra === undefined) {
                next(new AppError('No se encontró el carrito compra', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el carrito compra con el id especificado' });
            } else {
                res.status(200).json(carritoCompra);
            }
        } catch (error) {
            next(new AppError('No se logró obtener el carrito compra ', 404));
            console.log(error);
        }

    }

    static async obtenerCarritoCompraPorIdUsuario(req, res, next) {
        try {
            const id = req.params.id;

            const carritoCompra = await CarritoCompraDAO.obtenerCarritoCompraPorIdUsuario(id);

            if (carritoCompra === null || carritoCompra === undefined) {
                next(new AppError('No se encontró el carrito compra del usuario', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el carrito compra con el id del usuario especificado' });
            } else {
                res.status(200).json(carritoCompra);
            }


        } catch (error) {
            next(new AppError('No se logró obtener el carrito compra del usuario ', 404));
            console.log(error);
        }
    }

    static async obtenerCarritosCompra(req, res, next) {
        try {
            const carritosCompra = await CarritoCompraDAO.obtenerCarritosCompra();
            res.status(200).json(carritosCompra);
        } catch (error) {
            next(new AppError('No se logró obtener los carritos compra ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró obtener los carritos compra' });
        }
    }

    static async actualizarTotalCarritoCompra(idCarrito_Compra, total) {
        try {
            const errores = [];

            if (isNaN(parseFloat(total)) && isFinite(total)) {
                errores.push('El total no es válido');
            }

            if (errores.length > 0) {
                console.log(errores.join(', '));
            } else {
                const carritoCompra = await CarritoCompraDAO.actualizarCarritoCompra(idCarrito_Compra, total);
                if (carritoCompra === null || carritoCompra === undefined) {
                    console.log('No se encontró el carrito');
                }
            }

        } catch (error) {
            console.log(error);
        }
    }


    static async agregarBoletosACarritoCompra(req, res, next) {
        const idCarritoCompra = req.params.id;
        const boletosRequest = req.body;
        const nestedArray = Object.values(boletosRequest);
        const boletosArray = [].concat(...nestedArray);

        const boletos = [];

        // Validamos que los boletos existan y los obtenemos.
        for (const boletoObj of boletosArray) {
            if (boletoObj && boletoObj.idBoleto && typeof boletoObj.idBoleto === 'number' && Number.isInteger(boletoObj.idBoleto)) {
                try {
                    const boletoEncontrado = await BoletoDAO.obtenerBoletoPorId(boletoObj.idBoleto);
                    if (boletoEncontrado) {
                        boletos.push(boletoEncontrado);
                    } else {
                        res.status(404).json({ "message": "Un boleto no existe", "boletos": boletoObj });
                        return;
                    }
                } catch (error) {
                    console.error('Error al obtener boleto:', error);
                }
            }
        }
        // Resto de la lógica para agregar los boletos al carrito
        try {
            await CarritoCompraDAO.agregarBoletoACarritoCompra(idCarritoCompra, boletos);
            // Obtenemos nuevamente los boletos para sumarselo el total
            const nuevosBoletos = await CarritoCompraDAO.obtenerBoletosDeUnCarritoCompra(idCarritoCompra);
            const total = nuevosBoletos.reduce((acumulador, boleto) => acumulador + parseFloat(boleto.idBoleto_boleto.precio), 0);
            await CarritoCompraController.actualizarTotalCarritoCompra(idCarritoCompra, total)
            res.status(200).json({ "message": "Boletos Agregados con éxito", "boletos": nuevosBoletos });
        } catch (error) {
            res.status(404).json({ statusCode: 404, message: 'Has intentado agregar un boleto que ya existe en el carrito' });
        }

    }

    static async eliminarBoletosACarritoCompra(req, res, next) {
        const idCarritoCompra = req.params.id;
        const boletosRequest = req.body;
        const nestedArray = Object.values(boletosRequest);
        const boletosArray = [].concat(...nestedArray);
        const boletos = [];

        // Validamos que los boletos existan y los obtenemos.
        for (const boletoObj of boletosArray) {
            if (boletoObj && boletoObj.idBoleto && typeof boletoObj.idBoleto === 'number' && Number.isInteger(boletoObj.idBoleto)) {
                try {
                    const boletoEncontrado = await BoletoDAO.obtenerBoletoPorId(boletoObj.idBoleto);
                    if (boletoEncontrado) {
                        boletos.push(boletoEncontrado);
                    } else {
                        res.status(404).json({ "message": "Un boleto no existe", "boletos": boletoObj });
                        return;
                    }
                } catch (error) {
                    console.error('Error al obtener boleto:', error);
                }
            }
        }
        // Resto de la lógica para agregar los boletos al carrito
        try {
            await CarritoCompraDAO.eliminarBoletosDeCarritoCompra(idCarritoCompra, boletos);

            // Obtenemos nuevamente los boletos para calcular el total
            const nuevosBoletos = await CarritoCompraDAO.obtenerBoletosDeUnCarritoCompra(idCarritoCompra);
            const total = nuevosBoletos.reduce((acumulador, boleto) => acumulador + parseFloat(boleto.idBoleto_boleto.precio), 0);
            await CarritoCompraController.actualizarTotalCarritoCompra(idCarritoCompra, total)
            res.status(200).json({ "message": "Boletos Eliminados con éxito", "boletos": boletos });
        } catch (error) {
            res.status(404).json({ statusCode: 404, message: 'Error al eliminar los boletos' });
            console.log(error);
        }

    }

    static async validarCampos(idUsuario, total) {
        const errores = [];

        const usuario = await UsuarioController.obtenerUsuarioPorId(idUsuario);

        if (!usuario) {
            errores.push('El usuario no existe');
        }

        if (isNaN(parseFloat(total)) && isFinite(total)) {
            errores.push('El total no es válido');
        }

        return errores;
    }
}

module.exports = CarritoCompraController;