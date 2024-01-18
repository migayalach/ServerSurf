const { User, Sale, Cart } = require("../dataBase/dataBase");
const { userExist } = require("../controllers/helperControllers");

const destrucDataUser = async (idUser) =>
  ({ nameUser, lastName, emailUser } = await User.findOne({
    where: { idUser },
  }));

const createSale = async (idUser, costSale) => {
  // EXTRA VERIFICAR SI ESTE USUARIO TIENE PRODUCTOS EN EL CARRITO
  const cartUser = await Cart.findAll({ where: { idUser } });
  if (!cartUser.length) {
    throw Error`Lo siento usted no cuenta con productos en el carrito`;
  }
  const existUser = await userExist(idUser);
  if (!existUser) {
    throw Error`Lo siento el usuario no existe`;
  }
  const date = new Date();
  await Sale.create({ idUser, costSale, date });
  return {
    date,
    message: `Compra realizada con exito`,
  };
};

const getSaleId = async (idSale) => {
  const existSale = await Sale.findOne({ where: { idSale } });
  if (!existSale) {
    throw Error`Lo siento la venta que busca no existe`;
  }
  const { idUser, date, costSale } = await Sale.findOne({ where: { idSale } });
  const { nameUser, lastName, emailUser } = await destrucDataUser(idUser);
  return {
    idUser,
    message: `Venta encontrada`,
    nameUser,
    lastName,
    emailUser,
    date,
    costSale,
  };
};

const clearSaleData = async (data) => {
  const promisseSale = data.map(async ({ idSale, costSale, date, idUser }) => {
    const { nameUser, lastName, emailUser } = await User.findByPk(idUser);
    const objData = {
      idSale,
      idUser,
      date,
      nameUser,
      lastName,
      emailUser,
      costSale,
    };
    return objData;
  });
  return await Promise.all(promisseSale);
};

const getAllSales = async () => {
  const saleData = await Sale.findAll();
  return { message: `Lista de compras`, data: await clearSaleData(saleData) };
};






// BUSCAR PUEDE SER POR FECHAS, NAMEUSER, O EMAIL
const getSaleName = (name) => {
  return name;
};

// PARA EDITAR Y ELIMINAR, SERIA BUENO QUE LLEGE EL IDUSER
// Y VER SU NIVEL SE ACCESO PARA DAR PERMISOS
const putSales = (id) => {
  return `Se actualizó el ${id}`;
};

const deleteSales = (id) => {
  return `Se borró la venta ${id}`;
};

module.exports = {
  createSale,
  getSaleName,
  getSaleId,
  getAllSales,
  putSales,
  deleteSales,
};
