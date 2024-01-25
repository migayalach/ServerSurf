const { Sequelize } = require("sequelize");
const {
  DetailSale,
  Sale,
  Product,
  Cart,
  Category,
  Color,
  Brand,
  Size,
} = require("../dataBase/dataBase");
const { userExist } = require("./helperControllers");

async function productDetail(arrayProduct) {
  const data = arrayProduct.map(async ({ idProduct, amount }) => {
    const {
      code,
      name,
      image,
      priceProduct,
      description,
      idCategory,
      idColor,
      idBrand,
      idSize,
    } = await Product.findByPk(idProduct);
    const { nameCategory } = await Category.findByPk(idCategory);
    const { nameColor } = await Color.findByPk(idColor);
    const { brandName } = await Brand.findByPk(idBrand);
    const { nameSize } = await Size.findByPk(idSize);
    const priceTotal = Math.round(amount * priceProduct * 100) / 100;
    const obj = {
      idProduct,
      code,
      name,
      nameCategory,
      nameColor,
      nameSize,
      brandName,
      amount,
      priceProductUnit: priceProduct,
      priceTotal,
      image,
      description,
    };
    return obj;
  });
  return await Promise.all(data);
}

const createDetail = async (idSale, idUser, listProducts) => {
  
  //PREGUNTAR SI EXISTE EL USUARIO
  const existUser = await userExist(idUser);
  if (!existUser) {
    throw Error`Lo siento no existe el usuario`;
  }
  // PRIMERO PREGUNTAR SI EXISTE LA VENTA
  const existSale = await Sale.findOne({ where: { idSale } });
  if (!existSale) {
    throw Error`La venta no existe`;
  }
  // PREGUNTAR SI EXISTEN PRODUCTOS EN EL ARRAY
  if (!listProducts.length) {
    throw Error`No hay productos que agregar`;
  }

  // PREGUNTAMOS SI SON LOS PRODUCTOS EXISTEN
  const productPromisse = listProducts.map(async (product) => {
    const responseItem = await Product.findByPk(product.id);
    if (!responseItem) {
      
      return false;
    }
    return true;
  });
  
  
  const resuelto = await Promise.all(productPromisse);
  
  let count = 0;
  for (let i = 0; i < resuelto.length; i++) {
    if (resuelto[i] === true) {
      count++;
    }
  }
  console.log(listProducts);
  if (count === listProducts.length) {
    const dataCartUser = await Cart.findAll({
      
      where: { idUser },
      attributes: ["amount", "idProduct"],
    });
    console.log(dataCartUser);
    
    const promisseDetail = dataCartUser.map(async ({ idProduct, amount }) => {
      const detail = await DetailSale.create({ idSale, idProduct, amount });
      return detail;
    });
    const detailResponse = await Promise.all(promisseDetail);
    
    const mapDetailData = detailResponse.map(({ idProduct, amount }) => {
      return { idProduct, amount };
    });
    
    
    //! descontar del stock
    const stockPromisse = mapDetailData.map(async ({ idProduct, amount }) => {
      await Product.update(
        { stock: Sequelize.literal(`stock - ${amount}`) },
        { where: { idProduct } }
      );
    });
    

    await Promise.all(stockPromisse);

    return {
      message: `Lista de detalle`,
      data: await productDetail(mapDetailData),
    };
  }
  throw Error`Los productos no son los mismos`;
};

const getDetailId = async (idSale) => {
  const existSale = await Sale.findOne({ where: { idSale } });
  if (!existSale) {
    throw Error`Lo siento el detalle de venta que busca no existe`;
  }
  const dataDetail = await DetailSale.findAll({
    where: { idSale },
    attributes: ["idProduct", "amount"],
  });

  const arrayIdProduct = dataDetail.map(({ idProduct, amount }) => {
    return { idProduct, amount };
  });

  return {
    message: `Detalle de la fecha ${existSale.date}`,
    data: await productDetail(arrayIdProduct),
  };
};

const editDetail = (idDetail, name) => {
  return `edit ${idDetail} ${name}`;
};
const detailDelete = (idDetail) => {
  return `eliminando ${idDetail}`;
};
const getAllDetail = () => {
  return `todo`;
};
const getDetailName = (name) => {
  return `get nombre ${name}`;
};

module.exports = {
  createDetail,
  editDetail,
  detailDelete,
  getAllDetail,
  getDetailName,
  getDetailId,
};
