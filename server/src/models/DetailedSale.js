const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "DetailSale",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
