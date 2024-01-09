const { Op } = require("sequelize");
const { Product, Category } = require("../dataBase/dataBase");

const createProduct = async (
  idCategory,
  code,
  name,
  type,
  image,
  characteristics,
  priceProduct,
  description
) => {
  const existCategory = await Category.findOne({ where: { idCategory } });
  if (!existCategory) {
    throw Error`La categoria que intenta asignar no se encuentra registrada`;
  }

  const existCode = await Product.findOne({ where: { code } });
  if (existCode) {
    throw Error`El codigo: ${code} que introdujo ya esta registrado`;
  }

  const newProduct = await Product.create({
    idCategory,
    code,
    name,
    type,
    image,
    characteristics,
    priceProduct,
    description,
  });
  return newProduct;
};

const getProductName = async (name, code) => {
  if (name) {
    const productData = await Product.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (!productData.length) {
      throw Error`No se pudo encontrar nada`;
    }
    return productData;
  } else if (code) {
    const productData = await Product.findAll({
      where: { code: { [Op.iLike]: `%${code}%` } },
    });
    if (!productData.length) {
      throw Error`No se pudo encontrar nada`;
    }
    return productData;
  }
};

const getProductId = (id) => {
  return id;
};

const getAllProducts = async () => {
  return await Product.findAll();
};

const putProduct = (id) => {
  return id;
};

const deleteProduct = (id) => {
  return `Se borró el producto ${id}`;
};

module.exports = {
  createProduct,
  getProductName,
  getProductId,
  getAllProducts,
  putProduct,
  deleteProduct,
};
