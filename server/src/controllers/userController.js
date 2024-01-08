const { Op } = require("sequelize");
const { Level, User } = require("../dataBase/dataBase");

const createUser = async (idLevel, nameUser, emailUser, user, password) => {
  const existUser = await Level.findOne({
    where: {
      idLevel,
    },
  });
  if (!existUser) {
    throw Error(`El nivel que intenta asignar no se encuentra registrado`);
  }
  const existEmail = await User.findOne({
    where: {
      emailUser,
    },
  });
  if (existEmail) {
    throw Error(
      `Lo siento no puede haber dos cuentas con la misma dirección email`
    );
  }

  const newUser = await User.create({
    nameUser,
    emailUser,
    user,
    password,
    idLevel,
  });

  return newUser;
};

const getNameUser = (name) => {
  return name;
};

const getUserId = async (idUser) => {
  const dataUser = await User.findOne({
    where: {
      idUser,
    },
  });

  if (!dataUser) {
    throw Error(`El usuario que usted busca, no existe`);
  }

  const dataLevel = await Level.findOne({
    where: {
      idLevel: dataUser.idLevel,
    },
  });

  return { dataUser, dataLevel };
};

const getAllUser = () => {
  return "Todos los users";
};

const userDelete = (id) => {
  return "Elimina el user " + id;
};

const userUpDate = (id) => {
  return "Actualiza el user " + id;
};

module.exports = {
  createUser,
  getNameUser,
  getUserId,
  getAllUser,
  userDelete,
  userUpDate,
};
