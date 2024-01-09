const {
  createSale,
  getSaleName,
  getSaleId,
  getAllSales,
  putSales,
  deleteSales,
} = require("../controllers/saleController");

const postSale = (req, res) => {
  const { idUser } = req.body;
  try {
    const newSale = createSale(idUser);
    return res.status(200).json({ create: true, newSale });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getNameSale = (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const sale = getSaleName(name);
      return res.status(200).json(sale);
    } else {
      const allSales = getAllSales();
      return res.status(200).json(allSales);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getIdSale = (req, res) => {
  const { id } = req.params;
  try {
    const foundSale = getSaleId(id);
    return res.status(200).json(foundSale);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const saleDeleted = (req, res) => {
  const { id } = req.params;
  try {
    const saleDelete = deleteSales(id);
    return res.status(200).json(saleDelete);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const saleUpdated = (req, res) => {
  const { id } = req.body;
  try {
    const updatedSale = putSales(id);
    return res.status(200).json(updatedSale);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postSale,
  getNameSale,
  getIdSale,
  saleDeleted,
  saleUpdated,
};
