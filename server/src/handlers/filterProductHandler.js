const searchProductData = require("../controllers/filterProductController");

const getfilterProduct = async (request, response) => {
  const { category, color, size, orderBy, minPrice, maxPrice } = request.query;
  try {
    const data = await searchProductData(
      category,
      color,
      size,
      orderBy,
      minPrice,
      maxPrice
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = getfilterProduct;
