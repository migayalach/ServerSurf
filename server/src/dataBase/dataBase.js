const { Sequelize } = require("sequelize");
require("dotenv").config();

//TABLAS INTERMEDIAS
const detailedSaleModel = require("../models/DetailedSale");
const favoriteModel = require("../models/Favorites");
const qualificationModel = require("../models/Qualification");
const cartModel = require("../models/Cart");
const brandModel = require("../models/Brand");
const colorModel = require("../models/Color");
const sizeModel = require("../models/Sizes");

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
brandModel(sequelize);
colorModel(sequelize);
sizeModel(sequelize);

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
  Brand,
  Color,
  Size,
} = sequelize.models;

Level.hasMany(User, { foreignKey: "idLevel" });
User.belongsTo(Level, { foreignKey: "idLevel", as: "level" });
Category.hasMany(Product, { foreignKey: "idCategory" });
Color.hasMany(Product, { foreignKey: "idColor" });
Brand.hasMany(Product, { foreignKey: "idBrand" });
Size.hasMany(Product, { foreignKey: "idSize" });
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
Sale.belongsToMany(Product, { through: DetailSale, foreignKey: "idSale" });
Product.belongsToMany(Sale, { through: DetailSale, foreignKey: "idProduct" });

module.exports = { sequelize, ...sequelize.models };
