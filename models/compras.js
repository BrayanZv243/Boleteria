const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compras', {
    idCompra: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idPago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pagos',
        key: 'idPago'
      }
    },
    total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'compras',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCompra" },
        ]
      },
      {
        name: "fk_compras_pagos1_idx",
        using: "BTREE",
        fields: [
          { name: "idPago" },
        ]
      },
    ]
  });
};
