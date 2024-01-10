const { Op } = require("sequelize");
const { Category } = require("../dataBase/dataBase");

const allCategory = async () => {
  return await Category.findAll();
};

const categoryById = async (idCategory) => {
  if (idCategory) {
    const categoryIdentification = await Category.findOne({
      where: { idCategory },
    });
    if (!categoryIdentification) {
      throw Error(`No se encontró la categoría ${idCategory}`);
    } else {
      return categoryIdentification;
    }
  }
};

const categoryByName = async (name) => {
  const categoryData = await Category.findOne({
    where: { nameCategory: name },
  });

  if (categoryData) {
    return categoryData;
  } else {
    throw Error(`No se encontró la categoría ${name}`);
  }
};

const createCategory = async (nameCategory) => {
  const categoryExist = await Category.findOne({
    where: {
      nameCategory: {
        [Op.iLike]: `%${nameCategory}%`,
      },
    },
  });

  if (categoryExist) {
    throw Error(`Ya existe esta categoria, no puede haber duplicados`);
  }

  await Category.create({ nameCategory });
  return `Categoria: ${nameCategory} creada con exito`;
};

const deleteCat = async (idCategory) => {
  const existingCategory = await Category.findOne({ where: { idCategory } });

  if (!existingCategory) {
    throw new Error("Categoría inexistente");
  }

  const result = await Category.destroy({ where: { idCategory } });

  if (result) {
    return `Categoría ${idCategory} borrada con éxito`;
  } else {
    throw new Error(`No se pudo borrar la categoría ${idCategory}`);
  }
};

const updateCat = async (idCategory, nameCategory) => {
  const existingCategory = await Category.findOne({ where: { idCategory } });

  if (!existingCategory) {
    throw new Error("Categoría inexistente");
  } else {
  existingCategory.nameCategory = nameCategory;
  await existingCategory.save();

 return existingCategory
};
};

module.exports = {
  allCategory,
  categoryById,
  categoryByName,
  createCategory,
  deleteCat,
  updateCat,
};
