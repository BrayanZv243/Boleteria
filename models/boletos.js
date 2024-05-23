const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boletos', {
    idBoleto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idEvento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'eventos',
        key: 'idEvento'
      }
    },
    idAsiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'asientos',
        key: 'idAsiento'
      }
    },
    precio: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'boletos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idBoleto" },
        ]
      },
      {
        name: "fk_boletos_eventos1_idx",
        using: "BTREE",
        fields: [
          { name: "idEvento" },
        ]
      },
      {
        name: "fk_boletos_asientos1_idx",
        using: "BTREE",
        fields: [
          { name: "idAsiento" },
        ]
      },
    ]
  });
};
