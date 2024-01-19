const { Product, Category } = require("../dataBase/dataBase");

const searchProductData = async (
  category,
  color,
  size,
  orderBy,
  minPrice,
  maxPrice
) => {
  const product = await Product.findAll();
  return product;
};

module.exports = searchProductData;
