const { Op } = require("sequelize");
const { Category } = require("../dataBase/dataBase");

const createCategory = async (name) => {
  const uppercaseName = name.toUpperCase();
  const categoryExist = await Category.findOne({
    where: {
      nameCategory: {
        [Op.iLike]: `%${uppercaseName}%`,
      },
    },
  });

  if (categoryExist) {
    return {
      level: false,
      message: `Ya existe esta categoria con ese nombre: ${categoryExist.nameCategory}`,
      data: []
    }
  } else {
    await Category.create({
      nameCategory: uppercaseName
    });
  }

  const { data } = await allCategory()
  return {
    level: true,
    message: `Categoria ${uppercaseName} creada con éxito`,
    data
  };
};

const categoryByName = async (name) => {
  const uppercaseName = name.toUpperCase();
  const category = await Category.findAll({
    where: {
      nameCategory: {
        [Op.iLike]: `%${name}%`
      }
    }
  });

  if (category.length) {
    return {
      level: true,
      message: `Categoria ${uppercaseName} encontrada`,
      data: category
    }
  } else {
    return {
      level: false,
      message: `La categoria ${uppercaseName} no esta creada`,
      data: []
    }
  }
};

const categoryById = async (idCategory) => {
  const idCategorys = await Category.findOne({ where: { idCategory } });

  if (idCategorys) {
    return {
      level: true,
      message: `Categoria con ID: ${idCategory} encontrada`,
      data: [{
        idCategory: idCategorys.idCategory,
        nameCategory: idCategorys.nameCategory
      }]
    }
  } else {
    return {
      level: false,
      message: `La categoria con ID: ${idCategory} no esta creada`,
      data: []
    }
  }
};

const allCategory = async () => {
  const dataCategory = await Category.findAll();

  const formatteData = {
    level: true,
    message: 'Lista de categorias',
    data: dataCategory.map(category => ({
      idCategory: category.idCategory,
      nameCategory: category.nameCategory
    }))
  }
  return formatteData;
};

const categoryDelete = async (idCategory) => {
  const categoryExisting = await Category.findOne({ where: { idCategory } }, { attributes: ['nameCategory'] });

  if (!categoryExisting) {
    return {
      level: false,
      message: `No existe la categoria con ID: ${idCategory} para eliminar`,
      data: []
    }
  }

  const deleted = await Category.destroy({ where: { idCategory } });
  const { data } = await allCategory()
  if (deleted) {
    return {
      level: true,
      message: `Categoria ${categoryExisting.nameCategory} eliminado con exito`,
      data
    }
  }
};

const categoryUpDate = async (idCategory, nameCategory) => {
  const upperCaseName = nameCategory.toUpperCase();
  const categoryExisting = await Category.findOne({ where: { idCategory } });

  if (!categoryExisting) {
    return {
      level: false,
      message: `No existe la categoria con ID: ${idCategory} para actualizar`,
      data: []
    }
  } else {
    categoryExisting.nameCategory = upperCaseName;
    await categoryExisting.save();
    const { data } = await allCategory();
    return {
      level: true,
      message: `Categoria con ID: ${idCategory} actualizada exitosamente: ${upperCaseName}`,
      data
    };
  }
};

module.exports = {
  createCategory,
  categoryByName,
  categoryById,
  allCategory,
  categoryDelete,
  categoryUpDate,
};