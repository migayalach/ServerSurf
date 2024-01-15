const { Op } = require("sequelize");
const { Color } = require("../dataBase/dataBase");

const createColor = async (name) => {
  const uppercaseName = name.toUpperCase();
  const ColorExist = await Color.findOne({
    where: {
      nameColor: {
        [Op.iLike]: `%${uppercaseName}%`,
      },
    },
  });

  if (ColorExist) {
    return {
      level: false,
      message: `Ya existe este color con ese nombre: ${ColorExist.nameColor}`,
    };
  } else {
    await Color.create({
      nameColor: uppercaseName,
    });
  }

  const { data } = await allColor();
  return {
    level: true,
    message: `El color ${uppercaseName} fue creado con éxito`,
    data,
  };
};

const colorByName = async (name) => {
  const uppercaseName = name.toUpperCase();
  const color = await Color.findAll({
    where: {
      nameColor: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (color.length) {
    return {
      level: true,
      message: `Color ${uppercaseName} encontrada`,
      data: color,
    };
  } else {
    return {
      level: false,
      message: `El color ${uppercaseName} no esta creada`,
      data: []
    };
  }
};

const colorById = async (idColor) => {
  const idColors = await Color.findOne({ where: { idColor } });

  if (idColors) {
    return {
      level: true,
      message: `Color ${idColor} encontrada`,
      data: [
        {
          idColor: idColors.idColor,
          name: idColors.nameColor,
        },
      ],
    };
  } else {
    return {
      level: false,
      message: `El color ${idColor} no esta creada`,
      data: [],
    };
  }
};

const allColor = async () => {
  const dataColor = await Color.findAll();

  const formatteData = {
    level: true,
    message: "Lista de categorias",
    data: dataColor.map((color) => ({
      idColor: color.idColor,
      nameColor: color.nameColor,
    })),
  };
  return formatteData;
};

const colorDelete = async (idColor) => {
  const colorExisting = await Color.findOne(
    { where: { idColor } },
    { attributes: ["nameColor"] }
  );

  if (!colorExisting) {
    return {
      level: false,
      message: `No existe el color ${idColor} para eliminar`,
      data: []
    };
  }

  const deleted = await Color.destroy({ where: { idColor } });
  const { data } = await allColor();
  if (deleted) {
    return {
      level: true,
      message: `Color ${colorExisting.nameColor} eliminado`,
      data,
    };
  }
};

const colorUpDate = async (idColor, nameColor) => {
  const upperCaseName = nameColor.toUpperCase();
  const colorExisting = await Color.findOne({ where: { idColor } });

  if (!categoryExisting) {
    return {
      level: false,
      message: `No existe el color ID ${idColor} para actualizar`,
      data: [],
    };
  } else {
    colorExisting.nameColor = upperCaseName;
    await categoryExisting.save();
    const { data } = await allColor();
    return {
      level: true,
      message: `El color actualizado exitosamente: ${upperCaseName}`,
      data,
    };
  }
};

module.exports = {
  createColor,
  colorByName,
  colorById,
  allColor,
  colorDelete,
  colorUpDate,
};
