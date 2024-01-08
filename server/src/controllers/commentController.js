const createComment = (name) => {
  return `create ${name}`;
};

const editComment = (idComment, name) => {
  return `edit ${idComment} ${name}`;
};

const commentDelete = (idComment) => {
  return `eliminando ${idComment}`;
};

const getAllComment = () => {
  return `todo`;
};

const getCommentId = (idComment) => {
  return `por id ${idComment}`;
};

const getCommentName = (name) => {
  return `get nombre ${name}`;
};

module.exports = {
  createComment,
  editComment,
  commentDelete,
  getCommentId,
  getAllComment,
  getCommentName,
};
