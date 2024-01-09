const { Op } = require("sequelize");
const { Category } = require("../dataBase/dataBase");

const allCategory = async () => {
  return await Category.findAll();
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

const deleteCat = (id) => {
  return `se borro la categoria ${id}`;
};

module.exports = {
  allCategory,
  createCategory,
  deleteCat,
};
