class Usuario{
    constructor(nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña, activa){
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipoUsuario = tipoUsuario;
        this.edad = edad;
        this.telefono = telefono;
        this.correo = correo;
        this.contraseña = contraseña;
        this.activa = activa;
    }
}

module.exports = {Usuario};