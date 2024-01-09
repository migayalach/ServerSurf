const {
  allCategory,
  createCategory,
  deleteCat,
} = require("../controllers/categoryController");

const getCategory = async (request, response) => {
  try {
    const getAllCategory = await allCategory();
    response.status(200).json(getAllCategory);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const postCategory = async (request, response) => {
  const { nameCategory } = request.body;
  try {
    const newCategory = await createCategory(nameCategory);
    response.status(200).json(newCategory);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  try {
    const response = deleteCat(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCategory,
  postCategory,
  deleteCategory,
};
