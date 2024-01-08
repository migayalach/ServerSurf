const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "CommetProduct",
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      qualification: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
