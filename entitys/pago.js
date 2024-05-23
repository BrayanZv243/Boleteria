class Pago{
    constructor(idUsuario, monto, metodo, fecha){
        this.idUsuario = idUsuario;
        this.monto = monto;
        this.metodo = metodo;
        this.fecha = fecha;
        
    }
}

module.exports = {Pago};