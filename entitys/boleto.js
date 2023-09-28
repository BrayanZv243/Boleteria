class Boleto{
    constructor(idEvento, idAsiento, precio, estado){
        this.idEvento = idEvento;
        this.idAsiento = idAsiento;
        this.precio = precio;
        this.estado = estado;
    }
}

module.exports = {Boleto};