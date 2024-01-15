const { Op } = require("sequelize");
const { Product, Category, Brand, Color } = require("../dataBase/dataBase");
const { filterProducts, orderProduct } = require("../helpers/filterOrder");

const clearObj = (obj, nameCategory, brandName, nameColor) => {
  return {
    idProduct: obj.idProduct,
    idCategory: obj.idCategory,
    idColor: obj.idColor,
    idBrand: obj.idBrand,
    nameCategory,
    code: obj.code,
    name: obj.name,
    type: obj.type,
    image: obj.image,
    characteristics: obj.characteristics,
    brandName,
    nameColor,
    priceProduct: obj.priceProduct,
    stock: obj.stock,
    description: obj.description,
  };
};

const listProductsPromisse = async (productData) => {
  let allProducts = null;
  if (productData === undefined) {
    allProducts = await getAllProducts();
  } else {
    allProducts = productData;
  }

  const promisse = allProducts.map(
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

const createProduct = async (
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
  description
) => {
  const existCategory = await Category.findOne(
    { where: { idCategory } },
    { attribute: [`nameCategory`] }
  );

  if (!existCategory) {
    throw Error`La categoria que intenta asignar no se encuentra registrada`;
  }

  const existCode = await Product.findOne({ where: { code } });

  if (existCode) {
    throw Error`El codigo: ${code} que introdujo ya esta registrado`;
  }

  let newProduct = await Product.create({
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
  });

  return {
    message: `Producto: '${newProduct.name}', creado con exito`,
    dataNewProduct: clearObj(newProduct, existCategory.nameCategory),
    listProducts: await listProductsPromisse(),
  };
};

const getProductName = async (name, code) => {
  if (name) {
    const productData = await Product.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (!productData.length) {
      throw Error`No se pudo encontrar nada`;
    }
    return {
      message: `Lista de productos`,
      productData: await listProductsPromisse(productData),
    };
  } else if (code) {
    const productData = await Product.findAll({
      where: { code: { [Op.iLike]: `%${code}%` } },
    });
    if (!productData.length) {
      throw Error`No se pudo encontrar nada`;
    }
    return {
      message: `Lista de productos`,
      productData: await listProductsPromisse(productData),
    };
  }
};

//VIEJO COMPARAR CON NUEVO

// const getProductId = async (idProduct) => {
//   if (idProduct) {
//     const listProducts = await Product.findOne({ where: { idProduct } });
//     if (!listProducts) {
//       throw Error(`El producto que busca no pudo ser encontrado`);
//     }
//     const existCategory = await Category.findOne(
//       { where: { idCategory: listProducts.idCategory } },
//       { attribute: [`nameCategory`] }
//     );

//     const existColor = await Color.findOne(
//       { where: { idColor: listProducts.idColor } },
//       { attribute: [`nameColor`] }
//     );

//     const existBrand = await Brand.findOne(
//       { where: { idBrand: listProducts.idBrand } },
//       { attribute: [`brandName`] }
//     );

//     return {
//       message: `Producto encontrado con exito`,
//       product: clearObj(
//         listProducts,
//         existCategory.nameCategory,
//         existColor.nameColor,
//         existBrand.brandName
//       ),
//     };
//   }
// };


/**** */

//NUEVO PARA PRESENTAR
const getProductId = async (idProduct) => {
  if (idProduct) {
      const listProducts = await Product.findOne({ where: { idProduct } });
      if (!listProducts) {
        throw new Error("El producto que busca no pudo ser encontrado");
      }
      const [existCategory, existColor, existBrand] = await Promise.all([
        Category.findOne({ where: { idCategory: listProducts.idCategory } }),
        Color.findOne({ where: { idColor: listProducts.idColor } }),
        Brand.findOne({ where: { idBrand: listProducts.idBrand } }),
      ]);

      return {
        message:" Producto encontrado con exito",
        product: clearObj(
          listProducts,
          existCategory?.nameCategory,
          existColor?.nameColor,
          existBrand?.brandName
        ),
      };
  }
};

const getAllProducts = async (flag) => {
  if (flag) {
    return await listProductsPromisse();
  }
  return await Product.findAll({
    order: [["idProduct", "ASC"]],
  });
};

const putProduct = async (
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
  description
) => {
  const existingProduct = await Product.findOne({ where: { idProduct } });

  if (!existingProduct) {
    throw Error(`Producto no encontrado`);
  }

  const result = await Product.update(
    {
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
    },
    { where: { idProduct } }
  );

  if (result) {
    return {
      message: `Producto actualizado con exito`,
      dataUpdateProduct: await getProductId(idProduct),
      listProducts: await listProductsPromisse(),
    };
  } else {
    throw Error(
      `No se pudo actualizar la información del producto ${idProduct}`
    );
  }
};

const deleteProduct = async (idProduct) => {
  const existingProduct = await Product.findOne({ where: { idProduct } });
  if (!existingProduct) {
    throw Error(`El producto que desea eliminar no existe`);
  }

  const existCategory = await Category.findOne(
    { where: { idCategory: existingProduct.idCategory } },
    { attribute: [`nameCategory`] }
  );

  const result = await Product.destroy({ where: { idProduct } });

  if (result) {
    return {
      message: `Producto eliminado con exito `,
      dataDeleteProduct: clearObj(existingProduct, existCategory.nameCategory),
      listProducts: await listProductsPromisse(),
    };
  } else {
    throw Error(`No se pudo borrar el producto ${idProduct}`);
  }
};

const filterProduct = async (
  nameCategory,
  orderBy,
  priceStart,
  priceEnd,
  stockBy
) => {
  const listProducts = await listProductsPromisse();

  const dataSearch = {};
  return {
    message: `Productos filtrados`,
    productData: orderProduct(
      listProducts,
      nameCategory,
      orderBy,
      priceStart,
      priceEnd,
      stockBy
    ),
  };
};

module.exports = {
  createProduct,
  getProductName,
  getProductId,
  getAllProducts,
  putProduct,
  deleteProduct,
  filterProduct,
};
