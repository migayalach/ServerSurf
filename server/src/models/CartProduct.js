const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "CartProduct",
    {
      check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
