const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      idCategory: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      nameCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};