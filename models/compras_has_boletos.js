const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compras_has_boletos', {
    idCompra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'compras',
        key: 'idCompra'
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
    tableName: 'compras_has_boletos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCompra" },
          { name: "idBoleto" },
        ]
      },
      {
        name: "fk_compras_has_boletos_boletos1_idx",
        using: "BTREE",
        fields: [
          { name: "idBoleto" },
        ]
      },
      {
        name: "fk_compras_has_boletos_compras1_idx",
        using: "BTREE",
        fields: [
          { name: "idCompra" },
        ]
      },
    ]
  });
};
