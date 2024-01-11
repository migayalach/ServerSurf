const {
  createProduct,
  getProductName,
  getProductId,
  getAllProducts,
  putProduct,
  deleteProduct,
} = require("../controllers/productController");

const postProduct = async (request, response) => {
  const {
    idCategory,
    code,
    name,
    type,
    image,
    characteristics,
    priceProduct,
    description,
  } = request.body;
  try {
    const newProduct = await createProduct(
      idCategory,
      code,
      name,
      type,
      image,
      characteristics,
      priceProduct,
      description
    );
    return response.status(200).json({ create: true, newProduct });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

const getNameProduct = async (request, response) => {
  const { name, code } = request.query;
  try {
    if (name || code) {
      const sale = await getProductName(name, code);
      return response.status(200).json(sale);
    } else {
      const allProducts = await getAllProducts();
      return response.status(200).json(allProducts);
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

const getIdProduct = async (request, response) => {
  const { id } = request.params;
  try {
    const foundProduct = await getProductId(id);
    return response.status(200).json(foundProduct);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

const productDeleted = async (request, response) => {
  const { id } = request.params;
  try {
    const productDelete = await deleteProduct(id);
    return response.status(200).json(productDelete);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

const productUpdated = async (request, response) => {
  const {
    idProduct,
    idCategory,
    code,
    name,
    type,
    image,
    characteristics,
    priceProduct,
    description,
  } = request.body;
  try {
    const updatedProduct = await putProduct(
      idProduct,
      idCategory,
      code,
      name,
      type,
      image,
      characteristics,
      priceProduct,
      description
    );
    return response.status(200).json(updatedProduct);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

module.exports = {
  postProduct,
  getNameProduct,
  getIdProduct,
  productDeleted,
  productUpdated,
};
