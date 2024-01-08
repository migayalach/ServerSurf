const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "SalesCart",
    {},
    {
      timestamps: false,
    }
  );
};
