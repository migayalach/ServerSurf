const {
  createQualitation,
  editQualitation,
  qualitationDelete,
  getQualitationId,
  getAllQualitation,
  getQualitationName,
} = require("../controllers/qualitationController");

const postQualification = (request, response) => {
  const { name } = request.body;
  try {
    const newComment = createQualitation(name);
    response.status(200).json(newComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const updateQualification = (request, response) => {
  const { idComment, name } = request.body;
  try {
    const commentUpdate = editQualitation(idComment, name);
    response.status(200).json(commentUpdate);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteQualification = (request, response) => {
  const { idComment } = request.params;
  try {
    const delComment = qualitationDelete(idComment);
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

const getQualification = (request, response) => {
  const { name } = request.query;
  try {
    const allComment = name ? getQualitationName(name) : getAllQualitation();
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
