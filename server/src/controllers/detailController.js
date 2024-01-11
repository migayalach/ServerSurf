const { DetailSale, Sale, Product } = require("../dataBase/dataBase");

// verificar el idVenta, el producto, usar promose all para enviar n datos(productos)
const createDetail = async (idSale, idProduct, amount) => {
  const detailData = await DetailSale.create({ idSale, idProduct, amount });
  return detailData;
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

//idSale,
const getDetailId = (idDetail) => {
  return `por id ${idDetail}`;
};

module.exports = {
  createDetail,
  editDetail,
  detailDelete,
  getAllDetail,
  getDetailName,
  getDetailId,
};
