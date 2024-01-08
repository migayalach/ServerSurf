const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "SalesCart",
    {
      idCart: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
