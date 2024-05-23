var DataTypes = require("sequelize").DataTypes;
var _asientos = require("../models/asientos");
var _boletos = require("../models/boletos");
var _carrito_compra = require("../models/carrito_compra");
var _carrito_compra_has_boletos = require("../models/carrito_compra_has_boletos");
var _compras = require("../models/compras");
var _compras_has_boletos = require("../models/compras_has_boletos");
var _eventos = require("../models/eventos");
var _pagos = require("../models/pagos");
var _usuarios = require("../models/usuarios");

function initModels(sequelize) {
  var asientos = _asientos(sequelize, DataTypes);
  var boletos = _boletos(sequelize, DataTypes);
  var carrito_compra = _carrito_compra(sequelize, DataTypes);
  var carrito_compra_has_boletos = _carrito_compra_has_boletos(sequelize, DataTypes);
  var compras = _compras(sequelize, DataTypes);
  var compras_has_boletos = _compras_has_boletos(sequelize, DataTypes);
  var eventos = _eventos(sequelize, DataTypes);
  var pagos = _pagos(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  boletos.belongsToMany(carrito_compra, { as: 'idCarrito_Compra_carrito_compras', through: carrito_compra_has_boletos, foreignKey: "idBoleto", otherKey: "idCarrito_Compra" });
  boletos.belongsToMany(compras, { as: 'idCompra_compras', through: compras_has_boletos, foreignKey: "idBoleto", otherKey: "idCompra" });
  carrito_compra.belongsToMany(boletos, { as: 'idBoleto_boletos', through: carrito_compra_has_boletos, foreignKey: "idCarrito_Compra", otherKey: "idBoleto" });
  compras.belongsToMany(boletos, { as: 'idBoleto_boletos_compras_has_boletos', through: compras_has_boletos, foreignKey: "idCompra", otherKey: "idBoleto" });
  boletos.belongsTo(asientos, { as: "idAsiento_asiento", foreignKey: "idAsiento"});
  asientos.hasMany(boletos, { as: "boletos", foreignKey: "idAsiento"});
  carrito_compra_has_boletos.belongsTo(boletos, { as: "idBoleto_boleto", foreignKey: "idBoleto"});
  boletos.hasMany(carrito_compra_has_boletos, { as: "carrito_compra_has_boletos", foreignKey: "idBoleto"});
  compras_has_boletos.belongsTo(boletos, { as: "idBoleto_boleto", foreignKey: "idBoleto"});
  boletos.hasMany(compras_has_boletos, { as: "compras_has_boletos", foreignKey: "idBoleto"});
  carrito_compra_has_boletos.belongsTo(carrito_compra, { as: "idCarrito_Compra_carrito_compra", foreignKey: "idCarrito_Compra"});
  carrito_compra.hasMany(carrito_compra_has_boletos, { as: "carrito_compra_has_boletos", foreignKey: "idCarrito_Compra"});
  compras_has_boletos.belongsTo(compras, { as: "idCompra_compra", foreignKey: "idCompra"});
  compras.hasMany(compras_has_boletos, { as: "compras_has_boletos", foreignKey: "idCompra"});
  boletos.belongsTo(eventos, { as: "idEvento_evento", foreignKey: "idEvento"});
  eventos.hasMany(boletos, { as: "boletos", foreignKey: "idEvento"});
  compras.belongsTo(pagos, { as: "idPago_pago", foreignKey: "idPago"});
  pagos.hasMany(compras, { as: "compras", foreignKey: "idPago"});
  carrito_compra.belongsTo(usuarios, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuarios.hasMany(carrito_compra, { as: "carrito_compras", foreignKey: "idUsuario"});
  pagos.belongsTo(usuarios, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuarios.hasMany(pagos, { as: "pagos", foreignKey: "idUsuario"});

  return {
    asientos,
    boletos,
    carrito_compra,
    carrito_compra_has_boletos,
    compras,
    compras_has_boletos,
    eventos,
    pagos,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
