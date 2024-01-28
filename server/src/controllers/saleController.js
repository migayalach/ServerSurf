const { User, Sale, DetailSale, Level } = require("../dataBase/dataBase");
const { userExist } = require("../controllers/helperControllers");
const { sendConfirmationEmail } = require("../helpers/resendEmail");

const destrucDataUser = async (idUser) =>
  ({ nameUser, lastName, emailUser } = await User.findOne({
    where: { idUser },
  }));

const existSale = async (idSale) => await Sale.findOne({ where: { idSale } });

const createSale = async (idUser, costSale) => {
  // EXTRA VERIFICAR SI ESTE USUARIO TIENE PRODUCTOS EN EL CARRITO
  const existUser = await userExist(idUser);
  if (!existUser) {
    throw Error`Lo siento el usuario no existe`;
  }
  const date = new Date();
  const { idSale } = await Sale.create({ idUser, costSale, date });

  const userData = await destrucDataUser(idUser);
  const { nameUser, emailUser } = userData;
  const r = await sendConfirmationEmail(emailUser, nameUser, costSale);
  console.log(r);
  return {
    idSale,
    date,
    message: `Compra realizada con exito`,
  };
};

const getSaleId = async (idSale) => {
  if (!(await existSale(idSale))) {
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

const deleteSales = async (idSale, idUser) => {
  const dataUser = await userExist(idUser);
  if (!dataUser) {
    throw Error`El usuario no existe`;
  }
  const dataLevel = await Level.findOne({
    where: { idLevel: dataUser.idLevel },
  });

  if (dataLevel.nameLevel === "ADMIN") {
    if (!(await existSale(idSale))) {
      throw Error`Lo siento la venta que busca no existe`;
    }
    await DetailSale.destroy({ where: { idSale } });
    await Sale.destroy({ where: { idSale } });
    return `Venta eliminada con exito`;
  }
  throw Error`Lo siento usted no cuenta con los permisos para realizar esta operacion`;
};

module.exports = {
  createSale,
  getSaleName,
  getSaleId,
  getAllSales,
  putSales,
  deleteSales,
};
