const { Op } = require("sequelize");
const { Level, User } = require("../dataBase/dataBase");

const createUser = async (idLevel, nameUser, emailUser, lastName, password) => {
  const levelExist = await Level.findOne({
    where: {
      idLevel,
    },
  });
  if (!levelExist) {
    return {
      level: false,
      message: `El nivel ${idLevel} que intenta asignar no se encuentra registrado`,
      data: [],
    };
  }

  const emailExist = await User.findOne({
    where: {
      emailUser,
    },
  });
  if (emailExist) {
    return {
      level: false,
      message:
        "Lo siento no puede haber dos cuentas con la misma dirección email",
      data: [],
    };
  }

  await User.create({
    nameUser,
    emailUser,
    lastName,
    password,
    idLevel,
  });

  const { data } = await allUser();
  return {
    level: true,
    message: `Usuario ${nameUser} creado con éxito`,
    data,
  };
};

const userByName = async (name) => {
  const FirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const ConvierteUserName = FirstLetter(name);

  const user = await User.findAll({
    where: {
      nameUser: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Level,
      attributes: ["idLevel", "nameLevel"],
      as: "level",
    },
  });

  if (user.length) {
    return {
      level: true,
      message: `User ${ConvierteUserName} encontrado`,
      data: user.map((user) => ({
        idUser: user.idUser,
        idLevel: user.level.idLevel,
        nameLevel: user.level.nameLevel,
        nameUser: user.nameUser,
        emailUser: user.emailUser,
        lastName: user.lastName,
        password: user.password,
      })),
    };
  } else {
    return {
      level: false,
      message: `User ${ConvierteUserName} no encontrado`,
      data: [],
    };
  }
};

const userById = async (idUser) => {
  const idUsers = await User.findByPk(idUser, {
    include: {
      model: Level,
      attributes: ["idLevel", "nameLevel"],
      as: "level",
    },
  });

  if (idUsers) {
    return {
      level: true,
      message: `User ${idUser} encontrado`,
      data: [
        {
          idUser: idUsers.idUser,
          idLevel: idUsers.level.idLevel,
          nameLevel: idUsers.level.nameLevel,
          nameUser: idUsers.nameUser,
          emailUser: idUsers.emailUser,
          lastName: idUsers.lastName,
          password: idUsers.password,
        },
      ],
    };
  } else {
    return {
      level: false,
      message: `El user ${idUser} no existe`,
      data: [],
    };
  }
};

const allUser = async () => {
  const dataUser = await User.findAll({
    include: {
      model: Level,
      attributes: ["idLevel", "nameLevel"],
      as: "level",
    },
  });

  const formatteData = {
    level: true,
    message: "Lista de users",
    data: dataUser.map((users) => ({
      idUser: users.idUser,
      idlevel: users.level.idLevel,
      nameLevel: users.level.nameLevel,
      nameUser: users.nameUser,
      emailUser: users.emailUser,
      lastName: users.lastName,
      password: users.password,
    })),
  };
  return formatteData;
};

const userDelete = async (idUser) => {
  const userExisting = await User.findOne(
    { where: { idUser } },
    { attributes: ["nameLevel"] }
  );

  if (!userExisting) {
    return {
      level: false,
      message: `No existe el user ${idUser} para eliminar`,
      data: [],
    };
  }

  const deleted = await User.destroy({ where: { idUser } });
  const { data } = await allUser();
  if (deleted) {
    return {
      level: true,
      message: `User ${userExisting.nameUser} eliminado`,
      data,
    };
  }
};

const userUpDate = async (
  idUser,
  idLevel,
  nameUser,
  emailUser,
  lastName,
  password
) => {
  const userExisting = await User.findOne({ where: { idUser } });

  if (!userExisting) {
    return {
      level: false,
      message: `No existe el user ID ${idUser} para actualizar`,
      data: [],
    };
  } else {
    userExisting.password = password;
    userExisting.nameUser = nameUser;
    userExisting.idLevel = idLevel;
    userExisting.emailUser = emailUser;
    userExisting.lastName = lastName;
    await userExisting.save();
    const { data } = await allUser();
    return {
      level: true,
      message: `User actualizado exitosamente: ${nameUser}`,
      data,
    };
  }
};

module.exports = {
  createUser,
  userByName,
  userById,
  allUser,
  userDelete,
  userUpDate,
};
