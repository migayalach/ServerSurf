const { User, Level } = require("../dataBase/dataBase");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const userAccess = async (email, password) => {
  const user = await User.findOne({
    attributes: ["idUser", "idLevel", "nameUser", "password"],
    where: {
      emailUser: { [Op.like]: `%${email}%` },
    },
  });
  if (user) {
    const { idLevel, nameLevel } = await Level.findOne({
      where: { idLevel: user.idLevel },
    });
    if (await bcrypt.compare(password, user.password)) {
      return {
        idUser: user.idUser,
        idLevel: idLevel,
        level: nameLevel,
        access: true,
        name: user.nameUser,
        message: `Datos correctos`,
      };
    }
  }

  throw Error("Usuario no encontrado o contraseña incorrecta");
};

module.exports = userAccess;
