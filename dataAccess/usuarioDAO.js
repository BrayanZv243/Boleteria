const initModels = require('../migrations/init-models'); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require('../models');
const models = initModels(sequelize);
const Usuario = models.usuarios;

class UsuarioDAO {
    constructor() {}

    async crearUsuario(nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña) {
        try {
            return await Usuario.create({ nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña });
        } catch (error) {
            throw error
        }
    }

    async obtenerUsuarios() {
        try {
            return await Usuario.findAll();
        } catch (error) {
            throw error;
        }
    }

    async obtenerUsuarioPorId(id) {
        try {
            return await Usuario.findByPk(id);
        } catch (error) {
            throw error
        }
    }

    async actualizarUsuario(idUsuario, nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña) {
        try {
            await Usuario.update({ nombre, apellido, tipoUsuario, edad, telefono, correo, contraseña }, { where: { idUsuario } })
            return await Usuario.findByPk(idUsuario)
        } catch (error) {
            throw error
        }
    }

    async eliminarUsuario(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error('Usuario no encontrado')
            }
            await usuario.destroy();
            return usuario;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UsuarioDAO();