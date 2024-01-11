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

const getProductId = async (idProduct) => {
  if (idProduct) {
    const existingProduct = await Product.findOne({ where: { idProduct } });

    if (!existingProduct) {
      throw Error(`Producto ${idProduct} no encontrado`);
    } else {
      return existingProduct;
    }
  }
};

const getAllProducts = async () => {
  return await Product.findAll();
};

const putProduct = async (
  idProduct,
  idCategory,
  code,
  name,
  type,
  image,
  characteristics,
  priceProduct,
  description
) => {
  const existingProduct = await Product.findOne({ where: { idProduct } });

  if (!existingProduct) {
    throw Error(`Producto ${idProduct} no encontrado`);
  }

  const result = await Product.update({
    idCategory,
    code,
    name,
    type,
    image,
    characteristics,
    priceProduct,
    description,
  }, { where: { idProduct }});

  if(result){
    return `Información de producto ${idProduct} actualizada con éxito`
  } else {
    throw Error (`No se pudo actualizar la información del producto ${idProduct}`)
  }
};

const deleteProduct = async (idProduct) => {
  const existingProduct = await Product.findOne({ where: { idProduct } });

  if (!existingProduct) {
    throw Error(`No exíste el producto ${idProduct}`);
  }
  const result = await Product.destroy({ where: { idProduct } });

  if (result) {
    return `Producto ${idProduct} borrado con éxito`;
  } else {
    throw Error(`No se pudo borrar el producto ${idProduct}`);
  }
};

module.exports = {
  createProduct,
  getProductName,
  getProductId,
  getAllProducts,
  putProduct,
  deleteProduct,
};
