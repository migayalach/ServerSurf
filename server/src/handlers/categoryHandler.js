const { response, request } = require("express");
const {
  allCategory,
  categoryById,
  categoryByName,
  createCategory,
  deleteCat,
  updateCat,
} = require("../controllers/categoryController");


const getCategoryByName = async (request, response) => {
  const { name } = request.query;
  try {
    if(name){
      const categoryName = await categoryByName(name);
      response.status(200).json(categoryName);
    } else {
      const getAllCategory = await allCategory();
      response.status(200).json(getAllCategory);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}

const getCategoryById = async (request, response) => {
  const { idCategory } = request.params;
  try {
    const getCategoryID = await categoryById(idCategory);
    response.status(200).json(getCategoryID);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const postCategory = async (request, response) => {
  const { nameCategory, idCategory } = request.body;
  try {
    const newCategory = await createCategory(nameCategory, idCategory);
    response.status(200).json(newCategory);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (request, response) => {
  const { idCategory } = request.params;
  try {
    const result = await deleteCat(idCategory);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const updateCategory = async (request, response) => {
  const { idCategory, nameCategory } = request.body;
  try {
    const result = await updateCat(idCategory, nameCategory);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCategoryById,
  getCategoryByName,
  postCategory,
  deleteCategory,
  updateCategory,
};
