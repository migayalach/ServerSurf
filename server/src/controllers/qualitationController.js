const createQualitation = (name) => {
  return `create ${name}`;
};

const editQualitation = (idComment, name) => {
  return `edit ${idComment} ${name}`;
};

const qualitationDelete = (idComment) => {
  return `eliminando ${idComment}`;
};

const getAllQualitation = () => {
  return `todo`;
};

const getQualitationId = (idComment) => {
  return `por id ${idComment}`;
};

const getQualitationName = (name) => {
  return `get nombre ${name}`;
};

module.exports = {
  createQualitation,
  editQualitation,
  qualitationDelete,
  getAllQualitation,
  getQualitationId,
  getQualitationName,
};
