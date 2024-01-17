const {
    createSize,
    sizeByName,
    sizeById,
    allSize,
    sizeDelete,
    sizeUpDate,
} = require("../controllers/sizeController");

const postSize = async (request, response) => {
    const { name } = request.body;
    try {
        const responseData = await createSize(name)
        response.status(200).json(responseData);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

const getSizeByName = async (request, response) => {
    const { name } = request.query;
    try {
        if (name) {
            const sizeName = await sizeByName(name);
            response.status(200).json(sizeName);
        } else {
            const allSizes = await allSize();
            response.status(200).json(allSizes);
        }
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

const getSizeById = async (request, response) => {
    const { idSize } = request.params;
    try {
        const sizeFind = await sizeById(idSize);
        response.status(200).json(sizeFind);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

const deleteSize = async (request, response) => {
    const { idSize } = request.params;
    try {
        const sizeFind = await sizeDelete(idSize);
        response.status(200).json(sizeFind);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

const upDateSize = async (request, response) => {
    const { idSize, nameSize } = request.body;
    try {
        const upDate = await sizeUpDate(idSize, nameSize);
        response.status(200).json(upDate);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

module.exports = {
    postSize,
    getSizeByName,
    getSizeById,
    deleteSize,
    upDateSize,
};