const { Op } = require("sequelize");
const { Level, User } = require("../dataBase/dataBase");

const createUser = async (levelId, nameUser, emailUser, user, password) => {
  const existUser = await Level.findOne({
    where: {
      idLevel: levelId,
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
    throw Error(`Lo siento no puede haber dos cuentas con la misma dirección email`);
  }

  const newUser = await User.create({
    nameUser,
    emailUser,
    user,
    password,
    levelId,
  });

  return newUser;
};

const getNameUser = (name) => {
  return name;
};

const getUserId = (id) => {
  return id;
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
