const { Op } = require("sequelize");
const { Level } = require("../dataBase/dataBase");

const createLevel = async (name) => {
  const upperCaseName = name.toUpperCase();
  const levelExist = await Level.findOne({
    where: {
      nameLevel: {
        [Op.iLike]: `%${upperCaseName}%`,
      },
    },
  });

  if (levelExist) {
    return {
      level: false,
      message: `Ya existe un nivel con este nombre: ${levelExist.nameLevel}`
    }
  } else {
    await Level.create({
      nameLevel: upperCaseName,
    });
  }

  const { data } = await allLevel()
  return {
    level: true,
    message: `Nivel ${upperCaseName} creado con éxito`,
    data
  };
};

const levelByName = async (name) => {
  const upperCaseName = name.toUpperCase();
  const level = await Level.findAll({
    where: {
      nameLevel: {
        [Op.iLike]: `%${name}%`
      } 
    } 
  });

  if (level.length) {
    return {
      level: true,
      message: `Nivel ${upperCaseName} encontrado`,
      data: level
    }
  } else {
    return {
      level: false,
      message: `El nivel ${upperCaseName} no esta creado`,
      data: []
    }
  }
};

const levelById = async (idLevel) => {
  const idLevels = await Level.findOne({ where: { idLevel } });
  
  if (idLevels) {
    return {
      level: true,
      message: `Nivel ${idLevel} encontrado`,
      data: [{
        idLevel: idLevels.idLevel,
        name: idLevels.nameLevel
      }]
    }
  } else {
    return {
      level: false,
      message: `El nivel ${idLevel} no esta creado`,
      data: []
    }
  }
};

const allLevel = async () => {
  const dataLevel = await Level.findAll();
  
  const formatteData = {
    level: true,
    message: 'Lista de niveles',
    data: dataLevel.map(level => ({
      idLevel: level.idLevel,
      name: level.nameLevel
    }))
  }
  return formatteData;
};

const levelDelete = async (idLevel) => {
  const levelExisting = await Level.findOne({ where: { idLevel } }, { attributes: ['nameLevel'] });

  if (!levelExisting) {
    return {
      level: false,
      message: `No existe el nivel ${idLevel} para eliminar`,
      data: []
    }
  }

  const deleted = await Level.destroy({ where: { idLevel } });
  const { data } = await allLevel()
  if (deleted) {
    return {
      level: true,
      message: `Nivel ${levelExisting.nameLevel} eliminado`,
      data
    }
  } 
};

const levelUpDate = async (idLevel, nameLevel) => {
  const upperCaseName = nameLevel.toUpperCase();
  const levelExisting = await Level.findOne({ where: { idLevel } });

  if (!levelExisting) {
    return {
      level: false,
      message: `No existe el nivel ID ${idLevel} para actualizar`,
      data: []
    }
  } else {
    levelExisting.nameLevel = upperCaseName;
    await levelExisting.save();
    const { data } = await allLevel();
    return {
      level: true,
      message: `Nivel actualizado exitosamente: ${upperCaseName}`,
      data
    };
  }
};

module.exports = {
  createLevel,
  levelByName,
  levelById,
  allLevel,
  levelDelete,
  levelUpDate,
};
