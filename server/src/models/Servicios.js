const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      "Servicios",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
         }
      },
      { timestamps: false });
};