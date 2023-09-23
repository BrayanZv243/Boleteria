const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carrito_compra_has_boletos', {
    idCarrito_Compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'carrito_compra',
        key: 'idCarrito_Compra'
      }
    },
    idBoleto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'boletos',
        key: 'idBoleto'
      }
    }
  }, {
    sequelize,
    tableName: 'carrito_compra_has_boletos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCarrito_Compra" },
          { name: "idBoleto" },
        ]
      },
      {
        name: "fk_carrito_compra_has_boletos_boletos1_idx",
        using: "BTREE",
        fields: [
          { name: "idBoleto" },
        ]
      },
      {
        name: "fk_carrito_compra_has_boletos_carrito_compra1_idx",
        using: "BTREE",
        fields: [
          { name: "idCarrito_Compra" },
        ]
      },
    ]
  });
};
