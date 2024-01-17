const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Level",
    {
      idLevel: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      nameLevel: {
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