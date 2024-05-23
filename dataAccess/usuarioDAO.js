const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Usuario = models.usuarios;

class UsuarioDAO {
    constructor() {
    }

    static async crearUsuario(usuario) {
        try {
            const { nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña, activa } = usuario;
            return await Usuario.create({ nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña, activa });
        } catch (error) {
            return null;
        }
    }

    static async obtenerUsuarios() {
        try {
            return await Usuario.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async obtenerUsuarioPorId(id) {
        try {
            return await Usuario.findByPk(id);
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    static async obtenerUsuarioPorCorreo(correo) {
        try {
            return await Usuario.findOne({
                where: {
                    correo: correo
                }
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    static async actualizarUsuario(idUsuario, usuario) {
        const { nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña } = usuario;

        try {
            await Usuario.update({
                nombre,
                apellido,
                tipoUsuario,
                edad,
                telefono,
                correo,
                contraseña
            }, { where: { idUsuario } })
            return await Usuario.findByPk(idUsuario)
        } catch (error) {
            throw error
        }
    }

    static async eliminarUsuario(id) {
        try {
            await Usuario.update({
                activa : "INACTIVA"
            }, { where: { idusuario: id } })
            return 'Usuario desactivado';
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { UsuarioDAO };