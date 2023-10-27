const { CompraDAO } = require('../dataAccess/compraDAO');
const { AppError } = require('../utils/appError');

class ComprasController {

    static async obtenerCompras(req, res, next) {
        try {
            const compras = await CompraDAO.obtenerCompras();
            res.status(200).json(compras);
        } catch (error) {
            next(new AppError('No se logró obtener las compras', 404));
            res.status(404).json({ statusCode: 404, message: 'No se logró obtener las compras' });
            console.log(error);
        }
    }
}

module.exports = ComprasController;




