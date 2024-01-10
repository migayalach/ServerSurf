const {
  createQualitation,
  editQualitation,
  qualitationDelete,
  getQualitationId,
  getAllQualitation,
  getQualitationName,
} = require("../controllers/qualitationController");

const postQualification = async (request, response) => {
  const { idUser, idProduct, comment, points } = request.body;
  try {
    const newComment = await createQualitation(
      idUser,
      +idProduct,
      comment,
      points
    );
    response.status(200).json(newComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const updateQualification = async (request, response) => {
  const { idUser, idProduct, comment, points } = request.body;
  try {
    const commentUpdate = await editQualitation(
      +idUser,
      +idProduct,
      comment,
      points
    );
    response.status(200).json(commentUpdate);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteQualification = async (request, response) => {
  const { idUser, idProduct } = request.params;
  try {
    const delComment = await qualitationDelete(idUser, idProduct);
    response.status(200).json(delComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdQualification = (request, response) => {
  const { idComment } = request.params;
  try {
    const commentId = getQualitationId(idComment);
    response.status(200).json(commentId);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getQualification = async (request, response) => {
  const { name } = request.query;
  try {
    const allComment = name
      ? getQualitationName(name)
      : await getAllQualitation();
    response.status(200).json(allComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postQualification,
  updateQualification,
  deleteQualification,
  getIdQualification,
  getQualification,
};
