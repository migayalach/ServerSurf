const {
  createDetail,
  editDetail,
  detailDelete,
  getAllDetail,
  getDetailId,
  getDetailName,
} = require("../controllers/detailController");

const postDetail = async (request, response) => {
  const { idSale, listProducts } = request.body;
  try {
    const newDetail = await createDetail(idSale, listProducts);
    response.status(200).json(newDetail);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const updateDetail = (request, response) => {
  const { idDetail, name } = request.body;
  try {
    const detailUpdate = editDetail(idDetail, name);
    response.status(200).json(detailUpdate);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteDetail = (request, response) => {
  const { idDetail } = request.params;
  try {
    const delDetail = detailDelete(idDetail);
    response.status(200).json(delDetail);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdDetail = (request, response) => {
  const { idDetail } = request.params;
  try {
    const detailId = getDetailId(idDetail);
    response.status(200).json(detailId);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getDetailAll = (request, response) => {
  const { name } = request.query;
  try {
    const allDetail = name ? getDetailName(name) : getAllDetail();
    response.status(200).json(allDetail);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postDetail,
  updateDetail,
  deleteDetail,
  getIdDetail,
  getDetailAll,
};
