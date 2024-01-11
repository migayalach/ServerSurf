const { User, Sale, Cart } = require("../dataBase/dataBase");

const createSale = async (idUser, costSale) => {
  //VERIFICAR EN CART SI EXISTE EL USARIO
  const date = new Date();
  const saleData = await Sale.create({ idUser, costSale, date });
  return saleData;
};

const getSaleName = (name) => {
  return name;
};

const getSaleId = (id) => {
  return id;
};

const getAllSales = () => {
  return "Todas las ventas";
};

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
