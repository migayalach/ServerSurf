const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      "Categorias",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
         }
      },
      { timestamps: false });
};