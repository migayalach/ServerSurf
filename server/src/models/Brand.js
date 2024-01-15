const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Brand",
    {
      idBrand: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      brandName: {
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
