const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { Level, User, Favorite } = require("../dataBase/dataBase");
const { favoriteById } = require("./favoriteController");

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
    message: `Usuario ${nameUser} ${lastName} creado con éxito`,
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
      message: `El user ${convierteUserName} no existe `,
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
      message: `User con ID: ${idUser} encontrado`,
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
      message: `El user con ID: ${idUser} no existe`,
      data: [],
    };
  }
};

const allUser = async () => {
  const dataUser = await User.findAll({
    include: [
      {
        model: Level,
        attributes: ["idLevel", "nameLevel"],
        as: "level",
      },
    ]
  });

  const usersWithFavorites = await Promise.all(
    dataUser.map(async (user) => {
      // Obtiene favoritos de cada usuario
      const favorites = await favoriteById(user.idUser);

      // Retorna un objeto con la información combinada
      return {
        idUser: user.idUser,
        idlevel: user.level.idLevel,
        nameLevel: user.level.nameLevel,
        nameUser: user.nameUser,
        emailUser: user.emailUser,
        lastName: user.lastName,
        favorites,
      };
    })
  );

  const formatteData = {
    level: true,
    message: "Lista de users",
    data: usersWithFavorites,
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
      message: `No existe el user con ID: ${idUser} para eliminar`,
      data: [],
    };
  }

  const deleted = await User.destroy({ where: { idUser } });
  const { data } = await allUser();
  if (deleted) {
    return {
      level: true,
      message: `User ${userExisting.nameUser} ${userExisting.lastName} eliminado`,
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
      message: `No existe el user con ID: ${idUser} para actualizar`,
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
      message: `User ${nameUser} ${lastName} con ID: ${idUser} actualizado exitosamente`,
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