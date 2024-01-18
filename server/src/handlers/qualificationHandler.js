const {
  createQualitation,
  qualificationByName,
  qualificationById,
  allQualification,
  qualificationDelete,
  qualificationUpDate,
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

const getQualificationByName = async (request, response) => {
  const { name } = request.query;
  try {
    if (name) {
      const qualificationName = await qualificationByName(name);
      response.status(200).json(qualificationName);
    } else {
      const allQualifications = await allQualification();
      response.status(200).json(allQualifications);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getQualificationById = async (request, response) => {
  const { idUser } = request.params;
  try {
    const commentId = await qualificationById(idUser);
    response.status(200).json(commentId);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteQualification = async (request, response) => {
  const { idUser, idProduct } = request.params;
  try {
    const deleteComment = await qualificationDelete(+idUser, +idProduct);
    response.status(200).json(deleteComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const upDateQualification = async (request, response) => {
  const { idUser, idProduct, comment, points } = request.body;
  try {
    const commentUpdate = await qualificationUpDate(
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

module.exports = {
  postQualification,
  getQualificationByName,
  getQualificationById,
  deleteQualification,
  upDateQualification,
};