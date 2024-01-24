const uuid = require("uuid");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const _categories = require("../dataBase/dataCategory");
const { Level, User, Favorite } = require("../dataBase/dataBase");
const { favoriteById } = require("./favoriteController");
const resendEmail = require("../helpers/resendEmail");

const hashedPassword = async (password) => await bcrypt.hash(password, 10);

async function countCategories() {
  return await User.count();
}

async function createGoogle(idLevel, nameUser, emailUser, uniqueId) {
  const user = await User.create({
    idLevel,
    nameUser,
    emailUser,
    password: await hashedPassword(`${emailUser}`),
    uniqueId,
  });
  return { user, isGoogleRegistration: true };
}

async function createForm(idLevel, nameUser, emailUser, password) {
  await User.create({
    idLevel,
    nameUser,
    emailUser,
    uniqueId: uuid.v4(),
    password: await hashedPassword(`${password}`),
  });
  return `Creado con exito ||||| mediante form`;
}

async function levelData(nameLevel) {
  const level = await Level.findOne({
    where: {
      nameLevel: {
        [Op.iLike]: `${nameLevel}`,
      },
    },
    attributes: ["idLevel"],
  });

  if (level && level.idLevel) {
    return level;
  } else {
    throw Error(`No se encontró el nivel con nameLevel: ${nameLevel}`);
  }
}

async function userCreate(nameUser, emailUser, password, uniqueId) {
  let idLevel;
  // Determinar el nivel (ADMIN o STANDAR)
  if ((await countCategories()) < 1) {
    idLevel = (await levelData("ADMIN")).idLevel;
  } else {
    idLevel = (await levelData("STANDAR")).idLevel;
  }

  if (uniqueId) {
    // Registro mediante Google
    const { user, isGoogleRegistration } = await createGoogle(
      idLevel,
      nameUser,
      emailUser,
      uniqueId
    );
    // console.log(isGoogleRegistration, user);
    return { user, isGoogleRegistration };
    // return isGoogleRegistration ? user : null;
  } else if (password) {
    // Registro mediante formulario
    return await createForm(idLevel, nameUser, emailUser, password);
  }

  return null; // Manejar otros casos o errores según sea necesario
}

// SERIA SUPER QUE LUEDO DE CREAR LA CUENTA, MANDE UN EMAIL DE BIENVENIDA
const createUser = async (nameUser, emailUser, password, uniqueId) => {
  // FORM
  if (nameUser && emailUser && password) {
    const result = await userCreate(nameUser, emailUser, password, "");
    if (result && result.includes("Creado con exito")) {
      await resendEmail.sendWelcomeEmail(emailUser, nameUser);
    }
    return result;
    // GOOGLE
  } else if (nameUser && emailUser && uniqueId) {
    const { user, isGoogleRegistration } = await userCreate(nameUser, emailUser, "", uniqueId);
    if (user) {
      await resendEmail.sendWelcomeEmail(emailUser, nameUser, true);
    }
    return user;
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
    const favorites = await favoriteById(idUser);
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
          uniqueId: idUsers.uniqueId,
          favorites,
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
    ],
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
      message: `User ${userExisting.nameUser} eliminado`,
      data,
    };
  }
};

// SI EL LOGIN FORM LO REALIZA UNA PERSONA QUE SE REGISTRO POR GOOGLE
// EDITAR SU UUID
const userUpDate = async (
  idUser,
  idLevel,
  nameUser,
  emailUser,
  password,
  uniqueId
) => {
  const userExisting = await User.findOne({ where: { idUser } });
  if (!userExisting) {
    return {
      level: false,
      message: `No existe el user con ID: ${idUser} para actualizar`,
      data: [],
    };
  }
  // EDITAR DATOS MENOS PASSWORD NI UNIQUEID YA QUE ESTE SOLO ES SHITCH
  if (uniqueId && !password) {
    const data = await User.update(
      {
        nameUser,
        emailUser,
      },
      { where: { idUser } }
    );
    return {
      level: true,
      message: `User ${nameUser} con ID: ${idUser} actualizado exitosamente`,
      data,
    };
  }
  // CAMBIA CONTRASEÑA MENOS UNICID
  else if (password && !uniqueId) {
    const data = await User.update(
      {
        nameUser,
        emailUser,
        password: await hashedPassword(`${password}`),
      },
      { where: { idUser } }
    );
    return {
      level: true,
      message: `User ${nameUser} con ID: ${idUser} actualizado exitosamente`,
      data,
    };
  }
  else if(uniqueId && password){
    const data = await User.update(
      {
        nameUser,
        emailUser,
        password: await hashedPassword(`${password}`),
      },
      { where: { idUser } }
    );
    return {
      level: true,
      message: `User ${nameUser} con ID: ${idUser} actualizado exitosamente`,
      data,
    };
  }
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
    const usersWithFavorites = await Promise.all(
      user.map(async (user) => {
        const favorites = await favoriteById(user.idUser);
        return {
          idUser: user.idUser,
          idLevel: user.level.idLevel,
          nameLevel: user.level.nameLevel,
          nameUser: user.nameUser,
          emailUser: user.emailUser,
          favorites,
        };
      })
    );

    return {
      level: true,
      message: `Users con nombre similar a ${convierteUserName} encontrados`,
      data: usersWithFavorites,
    };
  } else {
    return {
      level: false,
      message: `No se encontraron users con nombre similar a ${convierteUserName}`,
      data: [],
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
