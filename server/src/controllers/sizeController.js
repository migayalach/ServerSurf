const { Op } = require("sequelize");
const { Size } = require("../dataBase/dataBase");

const createSize = async (name) => {
  const upperCaseName = name.toUpperCase();
  const sizeExist = await Size.findOne({
    where: {
      nameSize: upperCaseName,
    },
  });

  if (sizeExist) {
    return {
      level: false,
      message: `Ya existe el talle: ${sizeExist.nameSize}`,
      data: [],
    };
  } else {
    await Size.create({
      nameSize: upperCaseName,
    });
  }

  const { data } = await allSize();
  return {
    level: true,
    message: `Talle ${upperCaseName} creado con èxito`,
    data,
  };
};

const sizeByName = async (name) => {
  const upperCaseName = name.toUpperCase();
  const size = await Size.findAll({
    where: {
      nameSize: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (size.length) {
    return {
      level: true,
      message: `Talle ${upperCaseName} encontrado`,
      data: size,
    };
  } else {
    return {
      level: false,
      message: `El talle ${upperCaseName} no esta creado`,
      data: [],
    };
  }
};

const sizeById = async (idSize) => {
  const idSizes = await Size.findOne({ where: { idSize } });

  if (idSizes) {
    return {
      level: true,
      message: `Talle ${idSize} encontrado`,
      data: [
        {
          idSize: idSizes.idSize,
          name: idSizes.nameSize,
        },
      ],
    };
  } else {
    return {
      level: false,
      message: `El talle ${idSize} no esta creado`,
      data: [],
    };
  }
};

const allSize = async () => {
  const dataSize = await Size.findAll();

  const formatteData = {
    level: true,
    message: "Lista de talles",
    data: dataSize.map((size) => ({
      idSize: size.idSize,
      name: size.nameSize,
    })),
  };
  return formatteData;
};

const sizeDelete = async (idSize) => {
  const sizeExisting = await Size.findOne(
    { where: { idSize } },
    { attributes: ["nameSize"] }
  );

  if (!sizeExisting) {
    return {
      level: false,
      message: `No existe el talle ${idSize} para eliminar`,
      data: [],
    };
  }

  const deleted = await Size.destroy({ where: { idSize } });
  const { data } = await allSize();
  if (deleted) {
    return {
      level: true,
      message: `Talle ${sizeExisting.nameSize} eliminado`,
      data,
    };
  }
};

const sizeUpDate = async (idSize, nameSize) => {
  const upperCaseName = nameSize.toUpperCase();
  const sizeExisting = await Size.findOne({ where: { idSize } });

  if (!sizeExisting) {
    return {
      level: false,
      message: `No existe el talle ID ${idSize} para actualizar`,
      data: [],
    };
  } else {
    sizeExisting.nameSize = upperCaseName;
    await sizeExisting.save();
    const { data } = await allSize();
    return {
      level: true,
      message: `Talle actualizado exitosamente: ${upperCaseName}`,
      data,
    };
  }
};

module.exports = {
  createSize,
  sizeByName,
  sizeById,
  allSize,
  sizeDelete,
  sizeUpDate,
};
