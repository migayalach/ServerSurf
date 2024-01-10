const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Qualification",
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      points: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
