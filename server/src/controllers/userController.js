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

const getNameUser = async (name) => {
  const nameUser = await User.findAll({ where: { nameUser: name } });

  if (nameUser) {
    return nameUser
  } else {
    throw Error('Name not found');
  }
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

const getAllUser = async () => {
  const dataUser = await User.findAll();
  return dataUser;
};

const userDelete = async (idUser) => {
  const userExisting = await User.findOne({ where: { idUser } });

  if (!userExisting) {
    throw Error('Non-existent user')
  }

  const deleted = await User.destroy({ where: { idUser } });

  if (deleted) {
    return `User ${idUser} deleted`
  } else {
    throw Error(`Could not clear the user ${ idUser }`);
  }
};

const userUpDate = async (idUser, idLevel, nameUser, emailUser, user, password) => {
  const userExisting = await User.findOne({ where: { idUser } });

  if (!userExisting) {
    throw Error('Non-existent user')
  } else {
    userExisting.password = password;
    userExisting.nameUser = nameUser;
    userExisting.idLevel = idLevel;
    userExisting.emailUser = emailUser;
    userExisting.user = user;
    await userExisting.save();  // Guarda los cambios
    return { message: 'User updated successfully', userExisting };
  }
};

module.exports = {
  createUser,
  getNameUser,
  getUserId,
  getAllUser,
  userDelete,
  userUpDate,
};
