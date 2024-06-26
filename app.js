const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { AppError, globalHandlerError } = require("./utils/appError");
require("dotenv").config({ path: "./variables.env" });
const { sequelize } = require("./models");
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(bodyParser.json());
app.use(morgan("combined"));

// rutas
const UsuarioRouter = require("./routes/UsuarioRouter");
const AsientoRouter = require("./routes/AsientoRouter");
const EventoRouter = require("./routes/EventoRouter");
const CarritoCompraRouter = require("./routes/CarritoCompraRouter");
const BoletoRouter = require("./routes/BoletoRouter");
const PagoRouter = require("./routes/PagoRouter");
const CompraRouter = require("./routes/CompraRouter");
const SessionRouter = require("./routes/SesionRouter");
const ImagesRouter = require("./routes/ImagesRouter");

app.use("/api/usuarios", UsuarioRouter);
app.use("/api/asientos", AsientoRouter);
app.use("/api/eventos", EventoRouter);
app.use("/api/carrito-compras", CarritoCompraRouter);
app.use("/api/boletos", BoletoRouter);
app.use("/api/pagos", PagoRouter);
app.use("/api/compras", CompraRouter);
app.use("/api/login", SessionRouter);

// Ruta para servir imágenes
app.use("/api/images", ImagesRouter, express.static("images"));

app.all("*", (req, res, next) => {
    next(new AppError("No se pudo acceder a la ruta especificada", 404));
});

const port = process.env.PORT || 3000;

async function startServer() {
    await sequelize.sync();

    app.listen(port, () => {
        console.log("Servidor corriendo en el puerto: " + port);
    });
}

app.use(globalHandlerError);

startServer();
