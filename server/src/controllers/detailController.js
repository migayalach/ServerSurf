const { DetailSale, Sale, Product, Cart } = require("../dataBase/dataBase");
const { userExist, listProductsPromisse } = require("./helperControllers");

//NO OLVIDAR SIZE NI AMOUNT POR PRODUCTO
async function listDetail(listProducts) {
  const promiseData = Promise.all(
    listProducts.map(async (index) => await Product.findByPk(index))
  );
  const data = await promiseData;
  return await listProductsPromisse(data);
}

// verificar el idVenta, el producto, usar promose all para enviar n datos(productos)
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
  const productPromisse = listProducts.map(async (index) => {
    const responseItem = await Product.findByPk(index);
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

  if (count === listProducts.length) {
    const dataCartUser = await Cart.findAll({
      where: { idUser },
      attributes: ["amount", "idProduct"],
    });
    const promisseDetail = dataCartUser.map(async ({ idProduct, amount }) => {
      const detail = await DetailSale.create({ idSale, idProduct, amount });
      return detail;
    });
    await Promise.all(promisseDetail);
    //! descontar del stock
    return {
      message: `Lista de detalle`,
      data: await listDetail(listProducts),
    };
  }
  throw Error`Los productos no son los mismos`;
};

//idSale,
const getDetailId = async (idSale) => {
  const existSale = await Sale.findOne({ where: { idSale } });
  if (!existSale) {
    throw Error`Lo siento el detalle de venta que busca no existe`;
  }
  const dataDetail = await DetailSale.findAll({
    where: { idSale },
    attributes: ["idProduct"],
  });

  const arrayIdProduct = dataDetail.map(({ idProduct }) => idProduct);

  return {
    message: `Detalle de la fecha ${existSale.date}`,
    data: await listDetail(arrayIdProduct),
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
