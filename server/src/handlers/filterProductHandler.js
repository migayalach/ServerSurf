const searchProductData = require("../controllers/filterProductController");

const getfilterProduct = async (request, response) => {
  const {
    idCategory,
    idColor,
    idSize,
    idBrand,
    orderBy,
    minPrice,
    maxPrice,
    key,
  } = request.query;
  try {
    const data = await searchProductData(
      idCategory,
      idColor,
      idSize,
      idBrand,
      minPrice,
      maxPrice,
      orderBy,
      key
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = getfilterProduct;
