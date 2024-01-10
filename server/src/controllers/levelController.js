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

  return { message: "Nivel creado con éxito", newLevel };
};

const getNameLevel = async (name) => {
  const nameLevels = await Level.findOne({ where: { nameLevel: name } });

  if (nameLevels) {
    return nameLevels
  } else {
    throw Error('Name not found');
  }
};

const getLevelId = async (idLevel) => {
  const idLevels = await Level.findOne({ where: { idLevel } });
  
  if (idLevels) {
    return idLevels
  } else {
    throw Error('Level not found');
  }
};

const getAllLevel = async () => {
  const dataLevel = await Level.findAll();
  return dataLevel;
};

const levelDelete = async (idLevel) => {
  const levelExisting = await Level.findOne({ where: { idLevel } });

  if (!levelExisting) {
    throw Error('Non-existent level')
  }

  const deleted = await Level.destroy({ where: { idLevel } });

  if (deleted) {
    return `Level ${idLevel} deleted`
  } else {
    throw Error(`Could not clear the level ${ idLevel }`);
  }
};

const levelUpDate = async (idLevel, nameLevel) => {
  const levelExisting = await Level.findOne({ where: { idLevel } });

  if (!levelExisting) {
    throw Error('Non-existent level')
  } else {
    levelExisting.nameLevel = nameLevel;
    await levelExisting.save();  // Guarda los cambios
    return { message: 'Level updated successfully', levelExisting };
  }
  
};

module.exports = {
  createLevel,
  getNameLevel,
  getLevelId,
  getAllLevel,
  levelDelete,
  levelUpDate,
};
