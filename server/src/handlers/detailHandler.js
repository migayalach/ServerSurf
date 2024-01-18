const {
  createDetail,
  editDetail,
  detailDelete,
  getAllDetail,
  getDetailId,
  getDetailName,
} = require("../controllers/detailController");

const postDetail = async (request, response) => {
  const { idSale, idUser, listProducts } = request.body;
  try {
    const { message, data } = await createDetail(idSale, idUser, listProducts);
    response.status(200).json({ detail: true, message, data });
  } catch (error) {
    response
      .status(400)
      .json({ detail: false, error: error.message, data: [] });
  }
};

const getIdDetail = async (request, response) => {
  const { idSale } = request.params;
  try {
    const { message, data } = await getDetailId(idSale);
    response.status(200).json({ getDetail: true, message, data });
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
