const {
  createProduct,
  getProductName,
  getProductId,
  getAllProducts,
  putProduct,
  deleteProduct,
  filterProduct,
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
    stock,
    description,
  } = request.body;
  try {
    const { message, dataNewProduct, listProducts } = await createProduct(
      idCategory,
      code,
      name,
      type,
      image,
      characteristics,
      priceProduct,
      stock,
      description
    );
    return response.status(200).json({
      createProduct: true,
      message,
      dataNewProduct,
      listProducts,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ createProduct: false, message: error.message, listProducts: [] });
  }
};

const getNameProduct = async (request, response) => {
  const { name, code, nameCategory, orderBy, priceStart, priceEnd, stockBy } =
    request.query;
  try {
    if (name || code) {
      const { message, productData } = await getProductName(name, code);
      return response
        .status(200)
        .json({ getProduct: true, message, listProducts: productData });
    } else if (
      (nameCategory || orderBy || priceStart || priceEnd || stockBy) &&
      !name &&
      !code
    ) {
      const { message, productData } = await filterProduct(
        nameCategory,
        orderBy,
        +priceStart,
        +priceEnd,
        stockBy
      );
      return response
        .status(200)
        .json({ getProduct: true, message, listProducts: productData });
    } else {
      const allProducts = await getAllProducts(true);
      return response.status(200).json({
        getProduct: true,
        message: `Lista de productos`,
        listProducts: allProducts,
      });
    }
  } catch (error) {
    return response.status(400).json({
      getProduct: false,
      message: error.message,
      listProducts: [],
    });
  }
};

const getIdProduct = async (request, response) => {
  const { idProduct } = request.params;
  try {
    const { message, product } = await getProductId(idProduct);
    return response
      .status(200)
      .json({ getProductoId: true, message, listProducts: [product] });
  } catch (error) {
    return response
      .status(400)
      .json({ getProductoId: false, message: error.message, listProducts: [] });
  }
};

const productDeleted = async (request, response) => {
  const { idProduct } = request.params;
  try {
    const { message, dataDeleteProduct, listProducts } = await deleteProduct(
      idProduct
    );
    return response
      .status(200)
      .json({ deleteProduct: true, message, dataDeleteProduct, listProducts });
  } catch (error) {
    return response
      .status(400)
      .json({ deleteProduct: false, message: error.message, listProducts: [] });
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
    stock,
    description,
  } = request.body;
  try {
    const {
      message,
      dataUpdateProduct: { product },
      listProducts,
    } = await putProduct(
      idProduct,
      idCategory,
      code,
      name,
      type,
      image,
      characteristics,
      priceProduct,
      stock,
      description
    );
    return response.status(200).json({
      updateProduct: true,
      message,
      dataUpdateProduct: product,
      listProducts,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ updateProduct: false, message: error.message, listProducts: [] });
  }
};

module.exports = {
  postProduct,
  getNameProduct,
  getIdProduct,
  productDeleted,
  productUpdated,
};
