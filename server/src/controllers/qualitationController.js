const { Op } = require("sequelize");
const { User, Product, Qualification } = require("../dataBase/dataBase");

const createQualitation = async (idUser, idProduct, comment, points) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    return {
      level: false,
      message: `El usuario con ID: ${idUser} no existe`,
      data: []
    }
  }

  const existProduct = await Product.findOne({ where: { idProduct } });
  if (!existProduct) {
    return {
      level: false,
      message: `El producto con ID: ${idProduct} no existe`,
      data: []
    }
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
  
  const { data } = await allQualification();
  return {
    level: true,
    message: `Comentario creado con exito`,
    data
  }
};

const qualificationByName = (name) => {
  return `get nombre ${name}`;
};

const qualificationById = (idUser) => {
  return `por id ${idUser}`;
};

const allQualification = async () => {
  const dataQualification = await Qualification.findAll();

  const formatteData = {
    level: true,
    message: 'Lista de comentarios',
    data: dataQualification.map(quali => ({
      idUser: quali.idUser,
      idProduct: quali.idProduct,
      comment: quali.comment,
      points: quali.points
    }))
  }
  return formatteData;
};

const qualificationDelete = async (idUser, idProduct) => {
  
  const qualification = await Qualification.findOne({
    where: {
      idUser,
      idProduct
    }
  });

  if (!qualification) {
    return {
      level: false,
      message: 'Comentario no encontrado'
    }
  }

  const deleted = await Qualification.destroy({ where: { idUser, idProduct } });
  const { data } = await allQualification()
  if (deleted) {
    return {
      level: true,
      message: 'Comentario eliminado correctamente',
      data
    }
  }
};

const qualificationUpDate = async (idUser, idProduct, comment, points) => {
  const existUser = await User.findOne({ where: { idUser } });

  if (!existUser) {
    return {
      level: false,
      message: `No existe el user ID ${idUser} para actualizar`,
      data: [],
    };
  }

  const existProduct = await Product.findOne({ where: { idProduct } });
  if (!existProduct) {
    return {
      level: false,
      message: `No existe el producto con ID ${idUser} para actualizar`,
      data: [],
    };
  }

  const qualificationExisting = await Qualification.findOne({ where: { idUser, idProduct } });
  if (qualificationExisting) {
    qualificationExisting.comment = comment;
    qualificationExisting.points = points;
    await qualificationExisting.save();
    const { data } = await allQualification();
    return {
      level: true,
      message: 'Comentario actualizado exitosamente',
      data
    }
  }
};

module.exports = {
  createQualitation,
  qualificationByName,
  qualificationById,
  allQualification,
  qualificationDelete,
  qualificationUpDate,
};