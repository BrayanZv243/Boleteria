
class Evento{
    constructor(nombre, lugar, tipo, fecha, numBoletosVendidos, numBoletosDisponibles){
        this.nombre = nombre;
        this.lugar = lugar;
        this.tipo = tipo;
        this.fecha = fecha;
        this.numBoletosVendidos = numBoletosVendidos;
        this.numBoletosDisponibles = numBoletosDisponibles;
    }
}

module.exports = {Evento};