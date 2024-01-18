const { Op } = require("sequelize");
const { Product } = require("../dataBase/dataBase");
const {
  categoryExist,
  colorExist,
  brandExist,
  productExist,
  sizeExist,
  productIdExist,
  listProductsPromisse,
} = require("./helperControllers");
const { clearObj } = require("../helpers/dataClear");

// CREAR PRODUCTO
const createProduct = async (
  idCategory,
  idColor,
  idBrand,
  idSize,
  name,
  image,
  priceProduct,
  stock,
  description
) => {
  const existCategory = await categoryExist(idCategory);
  if (!existCategory) {
    throw Error`La categoria que intenta asignar no se encuentra registrada`;
  }

  const existColor = await colorExist(idColor);
  if (!existColor) {
    throw Error`El color que intenta asigna no se encuentra registrado`;
  }

  const existBrand = await brandExist(idBrand);
  if (!existBrand) {
    throw Error`La marca que intenta asignar no se encuentra registrado`;
  }

  const existSize = await sizeExist(idSize);
  if (!existSize) {
    throw Error`La talla que intenta asignar no se encuentra registrada`;
  }
  // CODE SE DEBE GENERAR AUTOMATICAMENTE

  let statusCreate = false;
  if (stock > 0) statusCreate = true;

  let newProduct = await Product.create({
    idCategory,
    idColor,
    idBrand,
    idSize,
    code: "SOY UN QR",
    name,
    image,
    priceProduct,
    stock,
    description,
    status: statusCreate,
  });
  const allData = await getAllProducts();

  return {
    message: `Producto: '${newProduct.name}', creado con exito`,
    dataNewProduct: clearObj(
      newProduct,
      existCategory.nameCategory,
      existBrand.brandName,
      existColor.nameColor,
      existSize.nameSize
    ),
    listProducts: await listProductsPromisse(allData),
  };
};

// MOSTRAR TODOS LOS PRODUCTOS
const getAllProducts = async () => {
  const allDataProduct = await Product.findAll();
  return await listProductsPromisse(allDataProduct);
};

// BUSQUEDA DE PRODUCTOS POR ID
const getProductId = async (idProduct) => {
  const listProducts = await productIdExist(idProduct);
  if (!listProducts) {
    throw Error(`El producto que busca no pudo ser encontrado`);
  }
  const [product] = await listProductsPromisse([listProducts]);
  return {
    message: `Producto encontrado con exito`,
    product,
  };
};

// ELIMINACION DE PRODUCTOS
const deleteProduct = async (idProduct) => {
  const existingProduct = await productIdExist(idProduct);
  if (!existingProduct) {
    throw Error(`El producto que desea eliminar no existe`);
  }

  await Product.destroy({ where: { idProduct } });
  const allDataProduct = await Product.findAll();

  return {
    message: `Producto eliminado con exito`,
    listProducts: await listProductsPromisse(allDataProduct),
  };
};

// BUSQUEDA POR NOMBRE O CODIGO
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

// EDITAR PRODUCTO
const putProduct = async (
  idProduct,
  idCategory,
  idColor,
  idBrand,
  idSize,
  name,
  image,
  priceProduct,
  stock,
  status,
  description
) => {
  const existingProduct = await productIdExist(idProduct);

  if (!existingProduct) {
    throw Error(`Producto no encontrado`);
  }
  if (+stock < 0) {
    throw Error`Lo siento no puede haber stock, negativo`;
  }

  // let statusCreate = status;
  // if (+stock === 0) {
  //   statusCreate = false;
  // } else if (+stock > 0) {
  //   statusCreate = true;
  // }

  const result = await Product.update(
    {
      idCategory,
      idColor,
      idBrand,
      idSize,
      name,
      image,
      priceProduct,
      stock,
      // status: statusCreate,
      status,
      description,
    },
    { where: { idProduct } }
  );

  if (result) {
    return {
      message: `Producto actualizado con exito`,
      dataUpdateProduct: await getProductId(idProduct),
      listProducts: await getAllProducts(),
    };
  } else {
    throw Error(
      `No se pudo actualizar la información del producto ${idProduct}`
    );
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
