const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
