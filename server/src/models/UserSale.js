const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("UserSale", {}, { timestamps: false });
};
