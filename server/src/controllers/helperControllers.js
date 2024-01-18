const { Product, Category, Brand, Color, User } = require("../dataBase/dataBase");
const { clearObj } = require("../helpers/dataClear");

async function categoryExist(idCategory) {
  return await Category.findOne(
    { where: { idCategory } },
    { attribute: [`nameCategory`] }
  );
}

async function colorExist(idColor) {
  return await Color.findOne(
    { where: { idColor } },
    { attribute: [`nameColor`] }
  );
}

async function brandExist(idBrand) {
  return await Brand.findOne(
    { where: { idBrand } },
    { attribute: [`brandName`] }
  );
}

async function productExist(code) {
  return await Product.findOne({ where: { code } });
}

async function productIdExist(idProduct) {
  return await Product.findOne({ where: { idProduct } });
}

async function userExist(idUser) {
  return await User.findOne({ where: { idUser } });
}

const listProductsPromisse = async (productData) => {
  const promisse = productData.map(
    async ({
      idProduct,
      idCategory,
      idColor,
      idBrand,
      code,
      name,
      type,
      image,
      characteristics,
      priceProduct,
      stock,
      description,
    }) => {
      const { nameCategory } = await Category.findByPk(idCategory);
      const { brandName } = await Brand.findByPk(idBrand);
      const { nameColor } = await Color.findByPk(idColor);
      const obj = {
        idProduct,
        idCategory,
        idColor,
        idBrand,
        code,
        name,
        type,
        image,
        characteristics,
        priceProduct,
        stock,
        description,
      };
      return clearObj(obj, nameCategory, brandName, nameColor);
    }
  );
  return await Promise.all(promisse);
};

module.exports = {
  categoryExist,
  colorExist,
  brandExist,
  productExist,
  productIdExist,
  listProductsPromisse,
  userExist,
};
