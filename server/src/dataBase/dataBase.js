const { Sequelize } = require("sequelize");
require("dotenv").config();

//TABLAS INTERMEDIAS
const userSaleModel = require("../models/UserSale");
const detailedSaleModel = require("../models/DetailedSale");
const favoriteModel = require("../models/Favorites");
const salesCartModel = require("../models/SalesCart");

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
} = sequelize.models;

Level.hasMany(User, { foreignKey: "levelId" });

User.belongsToMany(Sale, { through: UserSale, foreignKey: "userId" });
Sale.belongsToMany(User, { through: UserSale, foreignKey: "saleId" });

Sale.belongsToMany(Product, { through: DetailSale, foreignKey: "saleId" });
Product.belongsToMany(Sale, { through: DetailSale, foreignKey: "productId" });

Category.hasMany(Product, { foreignKey: "categoryId" });

User.belongsToMany(Product, { through: Favorites, foreignKey: "userId" });
Product.belongsToMany(User, { through: Favorites, foreignKey: "productId" });



module.exports = { sequelize, ...sequelize.models };
