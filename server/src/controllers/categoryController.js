
const allCategory = () => {
    return category;
};

const createCategory = (newCategory) => {
    return newCategory;
};

const deleteCat = (id) => {
    return `se borro la categoria ${id}`;
};

module.exports = {
    allCategory,
    createCategory,
    deleteCat
};