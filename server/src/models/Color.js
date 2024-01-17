const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Color",
    {
      idColor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      nameColor: {
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