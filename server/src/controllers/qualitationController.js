const { Op, where } = require("sequelize");
const { User, Product, Qualification } = require("../dataBase/dataBase");

const createQualitation = async (idUser, idProduct, comment, points) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    throw Error`El usario no existe`;
  }

  const existProduct = await Product.findOne({ where: { idProduct } });
  if (!existProduct) {
    throw Error`El producto no existe`;
  }

  const duplicateQualification = await Qualification.findAll({
    where: { idUser },
    attribute: ["idProduct"],
  });

  const qualificationArray = duplicateQualification
    .map(({ idProduct }) => idProduct)
    .includes(idProduct);

  if (qualificationArray) {
    throw Error`Lo siento no puede haber comentarios duplicados del mismo usiario, pero puede modificar`;
  }

  await Qualification.create({ idUser, idProduct, comment, points });
  //MOSTRAR TODAS LAS CALIFICACIONES
  return `Comentario creado con exito`;
};

const editQualitation = async (idUser, idProduct, comment, points) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    throw Error`El usario no existe`;
  }

  const existProduct = await Product.findOne({ where: { idProduct } });
  if (!existProduct) {
    throw Error`El producto no existe`;
  }

  const duplicateQualification = await Qualification.findOne({
    where: { idProduct, idUser },
  });

  if (!duplicateQualification) {
    throw Error`Lo siento no se pudo encontrar resultados`;
  }

  await Qualification.update(
    { comment, points },
    { where: { idUser, idProduct } }
  );

  return await getAllQualitation();
};

const qualitationDelete = async (idUser, idProduct) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    throw Error`El usario no existe`;
  }

  const existProduct = await Product.findOne({ where: { idProduct } });
  if (!existProduct) {
    throw Error`El producto no existe`;
  }

  const qualificationDelete = await Qualification.destroy({
    where: {
      idUser,
      idProduct,
    },
  });
  if (qualificationDelete) {
    return await getAllQualitation();
  }
  throw Error(`No se pudo eliminar`);
};

const getAllQualitation = async () => {
  return await Qualification.findAll();
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
