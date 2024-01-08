const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "DetailSale",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalCost: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
