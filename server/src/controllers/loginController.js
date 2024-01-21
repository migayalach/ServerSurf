const { User, Level } = require("../dataBase/dataBase");
const { createUser } = require("../controllers/userController");
const { Op, UUID } = require("sequelize");
const bcrypt = require("bcrypt");

async function existUserEmail(emailUser, uniqueId) {
  if (emailUser && !uniqueId) {
    return await User.findOne({
      attributes: ["idUser", "idLevel", "nameUser", "password"],
      where: {
        emailUser: { [Op.like]: `%${emailUser}%` },
      },
    });
  } else if (emailUser && uniqueId) {
    return await User.findOne({
      attributes: ["idUser", "idLevel", "nameUser", "password", "uniqueId"],
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

function responseData(idLevel, idUser, nameLevel, nameUser) {
  return {
    access: true,
    idLevel,
    idUser,
    level: nameLevel,
    nameUser,
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
    const { idUser, idLevel, password, nameUser } = await existUserEmail(
      emailUser
    );
    if (idUser && idLevel && password) {
      const { nameLevel } = await dataLevel(idLevel);
      if (await bcrypt.compare(userPassword, password))
        return responseData(idLevel, idUser, nameLevel, nameUser);
    }
    errorUser();
  }
  // GOOGLE
  else if (emailUser && uniqueId && !password) {
    const user = await existUserEmail(emailUser, uniqueId);
    if (!user) {
      await createUser(nameUser, emailUser, userPassword, uniqueId);
      const { idUser, idLevel } = await existUserEmail(emailUser, uniqueId);
      const { nameLevel } = await dataLevel(idLevel);
      return responseData(idLevel, idUser, nameLevel, nameUser);
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
          nameUser
        );
      }
    }
    errorUser();
  }
}

module.exports = userAccess;


// CUANDO EL USUARIO SE LOGEA CON GOOGLE 
// *SI NO EXISTE LA CUENTA SE CREA CON EMAIL Y UUID, LA CONTRASEÑA TOMA EL VALOR 
//  DE EMAIL => LUEGO SE MANDA UN EMAIL PARA CAMBIAR LA CONTRASEÑA

// SI EXISTE
// * LOGIN NORMAL

// CUANDO SE LOGUEA CON FORM
// email y password 

// !****
// CUANDO CREA LA CUENTA CON FORM 
// *se llena email y password en la tabla pero deja uuid en null 

// si se quiere logear con form 
// *preguntar si existe el email
// si existe pero no hay uuid editar y poner el uuid
// luego comprar password y uuid