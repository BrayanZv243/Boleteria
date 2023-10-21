const { CarritoCompraDAO } = require('../dataAccess/carritoCompraDAO');
const UsuarioController = require('../controllers/UsuarioController');
const { AppError } = require('../utils/appError');


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
                next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            } else {
                const carritoCompra = await CarritoCompraDAO.actualizarCarritoCompra(idCarrito_Compra, total);
                if (carritoCompra === null || carritoCompra === undefined) {
                    next(new AppError('No se encontró el carrito compra', 404));
                    res.status(404).json({ statusCode: 404, message: 'No se encontró el carrito compra con el id especificado' });
                } else {
                    res.status(200).json(carritoCompra);
                }
            }

        } catch (error) {
            next(new AppError('No se pudo actualizar el asiento ', 404));
            res.status(400).json({ statusCode: 400, message: 'No se logró actualizar el asiento' });
            console.log(error);
        }
    }


    static async agregarBoletosACarritoCompra(req, res, next) {
        const { boletos } = req.body;

        // Falta hacer boletos controller cuando se haga se validan los boletos y se agregan al carrito

        if (errores.length > 0) {
            next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            res.status(400).json({ statusCode: 400, message: errores.join(', ') });
        } else {
            const idCarritoCompra = await CarritoCompraDAO.obtenerCarritoCompraPorIdUsuario(idUsuario);

            if (idCarritoCompra === null || idCarritoCompra === undefined) {
                next(new AppError('No se encontró el carrito compra', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el carrito compra con el id especificado' });
            } else {
                await CarritoCompraDAO.agregarBoletoACarritoCompra(idCarritoCompra, boletos);
                const total = boletos.reduce((acumulador, boleto) => acumulador + boleto.precio, 0);

                this.actualizarTotalCarritoCompra(idCarritoCompra, total)
                res.status(200).json({ "message": "Boletos Agregados con éxito", "boletos": boletos });
            }
        }
    }

    static async eliminarBoletosACarritoCompra(req, res, next) {
        const { idUsuario, boletos } = req.body;

        const errores = await CarritoCompraController.validarCampos(idUsuario, boletos);

        if (errores.length > 0) {
            next(new AppError(`Error de validación: ${errores.join(', ')}`, 400));
            res.status(400).json({ statusCode: 400, message: errores.join(', ') });
        } else {
            const idCarritoCompra = await CarritoCompraDAO.obtenerCarritoCompraPorIdUsuario(idUsuario);

            if (idCarritoCompra === null || idCarritoCompra === undefined) {
                next(new AppError('No se encontró el carrito compra', 404));
                res.status(404).json({ statusCode: 404, message: 'No se encontró el carrito compra con el id especificado' });
            } else {
                await CarritoCompraDAO.eliminarBoletoACarritoCompra(idCarritoCompra, boletos);
                const total = boletos.reduce((acumulador, boleto) => acumulador + boleto.precio, 0);

                this.actualizarTotalCarritoCompra(idCarritoCompra, total)
                res.status(200).json({ "message": "Boletos Eliminado/s con éxito", "boletos": boletos });
            }
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