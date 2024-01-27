const { User, Level } = require("../dataBase/dataBase");
const { createUser } = require("../controllers/userController");
const { Op, UUID } = require("sequelize");
const bcrypt = require("bcrypt");

async function existUserEmail(emailUser, uniqueId) {
  if (emailUser && !uniqueId) {
    return await User.findOne({
      attributes: ["idUser", "idLevel", "nameUser", "password", "activeUser"],
      where: {
        emailUser: { [Op.like]: `%${emailUser}%` },
      },
    });
  } else if (emailUser && uniqueId) {
    return await User.findOne({
      attributes: [
        "idUser",
        "idLevel",
        "nameUser",
        "password",
        "uniqueId",
        "activeUser",
      ],
      where: {
        emailUser: { [Op.like]: `%${emailUser}%` },
        uniqueId,
      },
    });
  }
}

async function dataLevel(idLevel) {
  return await Level.findOne({
    where: { idLevel },
    attributes: ["nameLevel"],
  });
}

function responseData(
  idLevel,
  idUser,
  nameLevel,
  nameUser,
  emailUser,
  activeUser
) {
  return {
    access: true,
    idLevel,
    idUser,
    emailUser,
    level: nameLevel,
    nameUser,
    activeUser,
    message: `Datos correctos`,
  };
}

function errorUser() {
  throw Error("Usuario no encontrado o contraseña incorrecta");
}

async function userAccess(nameUser, emailUser, password, uniqueId) {
  const userPassword = password;
  // FORMULARIO
  if (emailUser && password && !uniqueId) {
    const { idUser, idLevel, password, nameUser, activeUser } =
      await existUserEmail(emailUser);
    if (idUser && idLevel && password) {
      const { nameLevel } = await dataLevel(idLevel);
      if (await bcrypt.compare(userPassword, password))
        return responseData(
          idLevel,
          idUser,
          nameLevel,
          nameUser,
          emailUser,
          activeUser
        );
    }
    errorUser();
  }
  // GOOGLE
  else if (emailUser && uniqueId && !password) {
    const user = await existUserEmail(emailUser, uniqueId);
    if (!user) {
      await createUser(nameUser, emailUser, userPassword, uniqueId);
      const { idUser, idLevel, activeUser } = await existUserEmail(
        emailUser,
        uniqueId
      );
      const { nameLevel } = await dataLevel(idLevel);
      return responseData(
        idLevel,
        idUser,
        nameLevel,
        nameUser,
        emailUser,
        activeUser
      );
    } else {
      const dataUser = await existUserEmail(emailUser, uniqueId);
      if (!dataUser) {
        errorUser();
      } else if (dataUser.uniqueId === uniqueId) {
        // si existe el usuario editar el UUID
        const { nameLevel } = await dataLevel(dataUser.idLevel);
        return responseData(
          dataUser.idLevel,
          dataUser.idUser,
          nameLevel,
          nameUser,
          "",
          dataUser.activeUser
        );
      }
    }
    errorUser();
  }
}

module.exports = userAccess;
