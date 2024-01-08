const createDetail = (name) => {
  return `create ${name}`;
};
const editDetail = (idDetail, name) => {
  return `edit ${idDetail} ${name}`;
};
const detailDelete = (idDetail) => {
  return `eliminando ${idDetail}`;
};
const getAllDetail = () => {
  return `todo`;
};
const getDetailName = (name) => {
  return `get nombre ${name}`;
};
const getDetailId = (idDetail) => {
  return `por id ${idDetail}`;
};

module.exports = {
  createDetail,
  editDetail,
  detailDelete,
  getAllDetail,
  getDetailName,
  getDetailId,
};
