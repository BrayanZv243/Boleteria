class Usuario{
    constructor(nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña){
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipoUsuario = tipoUsuario;
        this.edad = edad;
        this.telefono = telefono;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}

module.exports = {Usuario};