const {
  createSale,
  getSaleName,
  getSaleId,
  getAllSales,
  putSales,
  deleteSales,
} = require("../controllers/saleController");

const postSale = async (request, response) => {
  const { idUser, costSale } = request.body;
  try {
    const { idSale, date, message } = await createSale(idUser, costSale);
    return response
      .status(200)
      .json({ createSale: true, idUser, idSale, date, costSale, message });
  } catch (error) {
    return response
      .status(400)
      .json({ createSale: false, message: error.message });
  }
};

const getIdSale = async (request, response) => {
  const { idSale } = request.params;
  try {
    const { idUser, message, nameUser, lastName, emailUser, date, costSale } =
      await getSaleId(idSale);
    return response.status(200).json({
      getSale: true,
      message,
      idSale,
      data: [{ idUser, nameUser, lastName, emailUser, date, costSale }],
    });
  } catch (error) {
    return response.status(400).json({ saleId: false, message: error.message });
  }
};

const getNameSale = async (request, response) => {
  const { name } = request.query;
  try {
    if (name) {
      const sale = getSaleName(name);
      return response.status(200).json(sale);
    } else {
      const { message, data } = await getAllSales();
      return response.status(200).json({ sale: true, message, data });
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

const saleDeleted = async (request, response) => {
  const { idSale, idUser } = request.params;
  try {
    const saleDelete = await deleteSales(idSale, idUser);
    return response.status(200).json(saleDelete);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

const saleUpdated = (request, response) => {
  const { id } = request.body;
  try {
    const updatedSale = putSales(id);
    return response.status(200).json(updatedSale);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
};

module.exports = {
  postSale,
  getNameSale,
  getIdSale,
  saleDeleted,
  saleUpdated,
};
