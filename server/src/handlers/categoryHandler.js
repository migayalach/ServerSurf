const {
  createCategory,
  categoryByName,
  categoryById,
  allCategory,
  categoryDelete,
  categoryUpDate,
} = require("../controllers/categoryController");

const postCategory = async (request, response) => {
  const { name } = request.body;
  try {
    const responseData = await createCategory(name);
    response.status(200).json(responseData);
  } catch (error) {
    response.status(400).json({ level: false, error: error.message });
  }
};

const getCategoryByName = async (request, response) => {
  const { name } = request.query;
  try {
    if(name){
      const categoryName = await categoryByName(name);
      response.status(200).json(categoryName);
    } else {
      const allCategorys = await allCategory();
      response.status(200).json(allCategorys);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getCategoryById = async (request, response) => {
  const { idCategory } = request.params;
  try {
    const categoryFind = await categoryById(idCategory);
    response.status(200).json(categoryFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (request, response) => {
  const { idCategory } = request.params;
  try {
    const categoryFind = await categoryDelete(idCategory);
    response.status(200).json(categoryFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const upDateCategory = async (request, response) => {
  const { idCategory, nameCategory } = request.body;
  try {
    const upDateCategory = await categoryUpDate(idCategory, nameCategory);
    response.status(200).json(upDateCategory);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCategory,
  getCategoryByName,
  getCategoryById,
  deleteCategory,
  upDateCategory,
};
