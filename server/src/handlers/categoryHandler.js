const { allCategory, createCategory, deleteCat } = require("../controllers/categoryController");

const getCategory = (req, res) => {
    try {
        const response = allCategory();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const postCategory = (req, res) => {
    const newCategory = req.body;
    try {
        const response = createCategory(newCategory);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
    deleteCategory
};