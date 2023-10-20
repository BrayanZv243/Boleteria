const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { AppError, globalHandlerError } = require('./utils/appError')
require('dotenv').config({ path: './variables.env' });
const { sequelize } = require('./models');

app.use(bodyParser.json());
app.use(morgan('combined'));

// rutas
const UsuarioRouter = require('./routes/UsuarioRouter');
const AsientoRouter = require('./routes/AsientoRouter');

app.use('/api/usuarios', UsuarioRouter);
app.use('/api/asientos', AsientoRouter);

app.all('*', (req, res, next) => {
    next(new AppError('No se pudo acceder a la ruta especificada', 404));
});

const port = process.env.PORT || 3000;

async function startServer() {
    await sequelize.sync();

    app.listen(port, () => {
        console.log('Servidor corriendo en el puerto: ' + port)
    });
}

app.use(globalHandlerError);

startServer();