const { sequelize } = require('./models');
const { Usuario } = require('./entitys/usuario');
const {UsuarioDAO} = require('./dataAccess/usuarioDAO');
 const {EventoDAO} = require('./dataAccess/eventoDAO');
const { Evento } = require('./entitys/evento');

async function realizarTransacciones() {

    // Transacciones para Usuario terminadas
    // Hagan las transacciones que faltan :)
    try {
        await sequelize.sync()
        
        try {
            console.log('--------CREAMOS TRES USUARIOS--------')
            const nuevoUsuario = new Usuario(
                "John",
                "Doe",
                "Cliente",
                30,
                "123-456-7890",
                "john.doe@example.com",
                "secreta123"
            );
            const usuario1 = new Usuario(
                "Alice",
                "Smith",
                "Cliente",
                28,
                "555-123-4567",
                "alice.smith@example.com",
                "clave123"
            );

            // Usuario 2
            const usuario2 = new Usuario(
                "Bob",
                "Johnson",
                "Cliente",
                35,
                "555-987-6543",
                "bob.johnson@example.com",
                "contraseña456"
            );

            const evento1 = new Evento(
                "Peso",
                "Obregon",
                "Corridos",
                'Jul 12 2011',
                1000,
                555,
                
            );
            await UsuarioDAO.crearUsuario(
                nuevoUsuario.nombre,
                nuevoUsuario.apellido,
                nuevoUsuario.tipoUsuario,
                nuevoUsuario.edad,
                nuevoUsuario.telefono,
                nuevoUsuario.correo,
                nuevoUsuario.contraseña
            );
            await UsuarioDAO.crearUsuario(
                usuario1.nombre,
                usuario1.apellido,
                usuario1.tipoUsuario,
                usuario1.edad,
                usuario1.telefono,
                usuario1.correo,
                usuario1.contraseña
            );
            await UsuarioDAO.crearUsuario(
                usuario2.nombre,
                usuario2.apellido,
                usuario2.tipoUsuario,
                usuario2.edad,
                usuario2.telefono,
                usuario2.correo,
                usuario2.contraseña
            );
            console.log('Usuarios creados con éxito')

            console.log('--------CONSULTAMOS TODOS LOS USUARIOS--------')
            const users = await UsuarioDAO.obtenerUsuarios();
            console.log('USUARIOS: ', users)

            console.log('--------CONSULTAMOS UN USUARIO POR ID 25--------')
            
            const usuarioEncontrado = await UsuarioDAO.obtenerUsuarioPorId(1);
            console.log('Usuario Encontrado: ', usuarioEncontrado)

            console.log('--------ACTUALIZAMOS UN USUARIO POR ID 25--------')

            const usuarioActualizado = await UsuarioDAO.actualizarUsuario(
                25,
                "Bob",
                "Johnson",
                "Cliente",
                35,
                "555-987-6543",
                "bob.johnson@example.com",
                "contraseña456"
            );
            console.log('Usuario Actualizado: ', usuarioActualizado)

            //console.log('--------ELIMINAMOS EL USUARIO CON ID 1--------') // Solo sirve una vez, ya que elimina el usuario
            //const usuarioEliminado = await UsuarioDAO.eliminarUsuario(1);
            //console.log('Usuario Eliminado: ', usuarioEliminado)

            //Evento
            // Crear un evento
            await EventoDAO.crearEvento(
                evento1.nombre,
                evento1.lugar,
                evento1.tipo,
                evento1.fecha,
                evento1.numBoletosVendidos,
                evento1.numBoletosDisponibles
            );
            console.log("evento agregado");
            




        } catch (error) {
            throw error;
        }

    } catch (error) {
        console.error('Error en las transacciones: ' + error)
        console.log(error)
    } finally {
        // Cerramos la conexión a la base de datos cuando todo haya terminado.
        await sequelize.close();
    }
}

// Ejecutamos las transacciones
realizarTransacciones();