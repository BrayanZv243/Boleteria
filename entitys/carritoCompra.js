const { Usuario } = require('./entitys/usuario')
const { Boleto } = require('./entitys/Boleto')
class CarritoCompra{
    constructor(usuario, boleto, total){
        Usuario = usuario;
        Boleto = boleto;
        this.total = total;
    }
}

module.exports = {CarritoCompra};