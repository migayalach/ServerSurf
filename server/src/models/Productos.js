const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      "Productos",
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
         }
      },
      { timestamps: false });
};