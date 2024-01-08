const { Sequelize } = require("sequelize");
require("dotenv").config();

//TABLAS INTERMEDIAS
const userSaleModel = require("../models/UserSale");
const detailedSaleModel = require("../models/DetailedSale");
const favoriteModel = require("../models/Favorites");
const salesCartModel = require("../models/SalesCart");
const cartProduct = require("../models/CartProduct");
const commetProduct = require("../models/CommetProduct");

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
userSaleModel(sequelize);
detailedSaleModel(sequelize);
categoryModel(sequelize);
favoriteModel(sequelize);
salesCartModel(sequelize);
cartProduct(sequelize);
commetProduct(sequelize);

const {
  Level,
  User,
  Sale,
  UserSale,
  Product,
  DetailSale,
  Category,
  Favorites,
  SalesCart,
  CartProduct,
  CommetProduct,
} = sequelize.models;

Level.hasMany(User, { foreignKey: "levelId" });

User.belongsToMany(Product, { through: Favorites, foreignKey: "userId" });
Product.belongsToMany(User, { through: Favorites, foreignKey: "productId" });

Category.hasMany(Product, { foreignKey: "categoryId" });

User.belongsTo(SalesCart, { foreignKey: "userId" });

SalesCart.belongsToMany(Product, {
  through: CartProduct,
  foreignKey: "salesCartId",
});
Product.belongsToMany(SalesCart, {
  through: CartProduct,
  foreignKey: "productId",
});

SalesCart.hasMany(Sale, { foreignKey: "saleCartId" });

Sale.belongsToMany(Product, { through: DetailSale, foreignKey: "saleId" });
Product.belongsToMany(Sale, { through: DetailSale, foreignKey: "productId" });

Product.belongsToMany(Sale, {
  through: CommetProduct,
  foreignKey: "productId",
});
Sale.belongsToMany(Product, {
  through: CommetProduct,
  foreignKey: "saleId",
});

module.exports = { sequelize, ...sequelize.models };

// User.belongsToMany(Sale, { through: UserSale, foreignKey: "userId" });
// Sale.belongsToMany(User, { through: UserSale, foreignKey: "saleId" });
