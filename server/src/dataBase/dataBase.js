const { Sequelize } = require("sequelize");
require("dotenv").config();

//TABLAS INTERMEDIAS
const detailedSaleModel = require("../models/DetailedSale");
const favoriteModel = require("../models/Favorites");
const qualificationModel = require("../models/Qualification");
const cartModel = require("../models/Cart");

// TABLAS
const levelModel = require("../models/Level");
const userModel = require("../models/User");
const saleModel = require("../models/Sale");
const productModel = require("../models/Product");
const categoryModel = require("../models/Category");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

levelModel(sequelize);
userModel(sequelize);
saleModel(sequelize);
productModel(sequelize);
detailedSaleModel(sequelize);
categoryModel(sequelize);
favoriteModel(sequelize);
cartModel(sequelize);
qualificationModel(sequelize);

const {
  Level,
  User,
  Sale,
  Product,
  Category,
  Favorites,
  Cart,
  Qualification,
  DetailSale,
} = sequelize.models;

Level.hasMany(User, { foreignKey: "idLevel" });
Category.hasMany(Product, { foreignKey: "idCategory" });
User.belongsToMany(Product, { through: Favorites, foreignKey: "idUser" });
Product.belongsToMany(User, { through: Favorites, foreignKey: "idProduct" });
User.belongsToMany(Product, { through: Qualification, foreignKey: "idUser" });
Product.belongsToMany(User, {
  through: Qualification,
  foreignKey: "idProduct",
});
User.belongsToMany(Product, { through: Cart, foreignKey: "idUser" });
Product.belongsToMany(User, { through: Cart, foreignKey: "idProduct" });
User.hasMany(Sale, { foreignKey: "idUser" });

Sale.belongsToMany(Product, { through: DetailSale, foreignKey: "saleId" });
Product.belongsToMany(Sale, { through: DetailSale, foreignKey: "productId" });

module.exports = { sequelize, ...sequelize.models };