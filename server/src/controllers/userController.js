const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { Level, User } = require("../dataBase/dataBase");

const hashedPassword = async (password) => await bcrypt.hash(password, 10);

const createUser = async (nameUser, emailUser, lastName, password) => {
  const existingUser = await User.findOne({  // Verificar si el correo electrónico ya está registrado
    where: {
      emailUser,
    },
  });

  if (existingUser) {
    return {
      level: false,
      message: 'Ya existe un usuario con este correo electrónico',
      data: [],
    };
  }

  const countUser = await User.count();

  if (countUser < 1) { // Verificar si es el primer usuario
    let adminLevel = await Level.findOne({ where: { nameLevel: 'ADMIN' } });

    if (!adminLevel) {
      const createdAdminLevel = await Level.create({ nameLevel: 'ADMIN' });
      adminLevel = createdAdminLevel;
    }

    let standarLevel = await Level.findOne({ where: { nameLevel: 'STANDAR' } }); // Crear el nivel 'STANDAR' si no existe

    if (!standarLevel) {
      const createdStandarLevel = await Level.create({ nameLevel: 'STANDAR' });
      standarLevel = createdStandarLevel;
    }

    await User.create({  // Crear el usuario con nivel 'ADMIN'
      idLevel: adminLevel.idLevel,
      nameUser,
      emailUser,
      lastName,
      password: await hashedPassword(`${password}`),
    });
  } else {
    let standarLevel = await Level.findOne({ where: { nameLevel: 'STANDAR' } });
    if (!standarLevel) {
      const createdStandarLevel = await Level.create({ nameLevel: 'STANDAR' });
      standarLevel = createdStandarLevel;
    }

    await User.create({
      idLevel: standarLevel.idLevel,
      nameUser,
      emailUser,
      lastName,
      password: await hashedPassword(`${password}`),
    });
  }

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
  const convierteUserName = FirstLetter(name);

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
      message: `User ${convierteUserName} encontrado`,
      data: user.map((user) => ({
        idUser: user.idUser,
        idLevel: user.level.idLevel,
        nameLevel: user.level.nameLevel,
        nameUser: user.nameUser,
        emailUser: user.emailUser,
        lastName: user.lastName,
      })),
    };
  } else {
    return {
      level: false,
      message: `User ${convierteUserName} no encontrado`,
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
    userExisting.password = await hashedPassword(password);
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