const {
  createComment,
  editComment,
  commentDelete,
  getCommentId,
  getAllComment,
  getCommentName,
} = require("../controllers/commentController");

const postComment = (request, response) => {
  const { name } = request.body;
  try {
    const newComment = createComment(name);
    response.status(200).json(newComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const updateComment = (request, response) => {
  const { idComment, name } = request.body;
  try {
    const commentUpdate = editComment(idComment, name);
    response.status(200).json(commentUpdate);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteComment = (request, response) => {
  const { idComment } = request.params;
  try {
    const delComment = commentDelete(idComment);
    response.status(200).json(delComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdComment = (request, response) => {
  const { idComment } = request.params;
  try {
    const commentId = getCommentId(idComment);
    response.status(200).json(commentId);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getDetComment = (request, response) => {
  const { name } = request.query;
  try {
    const allComment = name ? getCommentName(name) : getAllComment();
    response.status(200).json(allComment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postComment,
  updateComment,
  deleteComment,
  getIdComment,
  getDetComment,
};
