const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      "Usuarios",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
         }
      },
      { timestamps: false });
};