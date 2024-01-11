const { Sequelize } = require("sequelize");
require("dotenv").config();

//TABLAS INTERMEDIAS
const userSaleModel = require("../models/UserSale");
const detailedSaleModel = require("../models/DetailedSale");
const favoriteModel = require("../models/Favorites");
const salesCartModel = require("../models/SalesCart");
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
userSaleModel(sequelize);
detailedSaleModel(sequelize);
categoryModel(sequelize);
favoriteModel(sequelize);
salesCartModel(sequelize);
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
  // UserSale,
  // SalesCart,
  // CommetProduct,
} = sequelize.models;

Level.hasMany(User, { foreignKey: "idLevel" });//OK
Category.hasMany(Product, { foreignKey: "idCategory" });//OK
User.belongsToMany(Product, { through: Favorites, foreignKey: "idUser" });//OK
Product.belongsToMany(User, { through: Favorites, foreignKey: "idProduct" });//OK
User.belongsToMany(Product, { through: Qualification, foreignKey: "idUser" });//OK
Product.belongsToMany(User, {
  through: Qualification,
  foreignKey: "idProduct",
});//OK
User.belongsToMany(Product, { through: Cart, foreignKey: "idUser" });//OK
Product.belongsToMany(User, { through: Cart, foreignKey: "idProduct" });//OK
User.hasMany(Sale, { foreignKey: "idUser" }); //cambiar nombre a sale -- OK

Sale.belongsToMany(Product, { through: DetailSale, foreignKey: "saleId" });//ok - probando
Product.belongsToMany(Sale, { through: DetailSale, foreignKey: "productId" });//ok -- probando

module.exports = { sequelize, ...sequelize.models };



// Category.hasMany(Product, { foreignKey: "categoryId" });

// User.belongsTo(SalesCart, { foreignKey: "userId" });

// SalesCart.belongsToMany(Product, {
//   through: CartProduct,
//   foreignKey: "salesCartId",
// });
// Product.belongsToMany(SalesCart, {
//   through: CartProduct,
//   foreignKey: "productId",
// });

// SalesCart.hasMany(Sale, { foreignKey: "saleCartId" });

// Product.belongsToMany(Sale, {
//   through: CommetProduct,
//   foreignKey: "productId",
// });
// Sale.belongsToMany(Product, {
//   through: CommetProduct,
//   foreignKey: "saleId",
// });

// User.belongsToMany(Sale, { through: UserSale, foreignKey: "userId" });
// Sale.belongsToMany(User, { through: UserSale, foreignKey: "saleId" });
