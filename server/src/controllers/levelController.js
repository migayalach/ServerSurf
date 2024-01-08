const { Op } = require("sequelize");
const { Level } = require("../dataBase/dataBase");

const createLevel = async (name) => {
  const levelExist = await Level.findOne({
    where: {
      nameLevel: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (levelExist) {
    throw Error("Ya existe un nivel con este nombre");
  }

  const newLevel = await Level.create({
    nameLevel: name,
  });

  return "Nivel creado con éxito", newLevel;
};

const getNameLevel = (name) => {
  return name;
};

const getLevelId = (id) => {
  return id;
};

const getAllLevel = async () => {
  const dataLevel = await Level.findAll();
  return dataLevel;
};

const levelDelete = (id) => {
  return "Elimina el level " + id;
};

const levelUpDate = (id) => {
  return "Actualiza el level " + id;
};

module.exports = {
  createLevel,
  getNameLevel,
  getLevelId,
  getAllLevel,
  levelDelete,
  levelUpDate,
};
