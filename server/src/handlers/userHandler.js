const { createUser, getNameUser, getAllUser, getUserId, userDelete, userUpDate } = require("../controllers/userController");

const postUser = (request, response) => {
    const { name } = request.body;
    try {
       const newUser = createUser(name);
       response.status(200).json({ create: true, newUser }); 
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

const getUserName = (request, response) => {
    const { name } = request.query;
    try {
        if (name) {
            const userName = getNameUser(name);
            response.status(200).json(userName)
        } else {
            const allUsers = getAllUser();
            response.status(200).json(allUsers);
        }
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

const getIdUser = (request, response) => {
    const { id } = request.params;
    try {
        const userFind = getUserId(id);
        response.status(200).json(userFind);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

const deleteUser = (request, response) => {
    const { id } = request.params;
    try {
        const userFind = userDelete(id);
        response.status(200).json(userFind);
    } catch (error) {
        response.status(400).json({ error: error.message }); 
    }
};

const userPut = (request, response) => {
    const { id } = request.body;
    try {
        const upDate = userUpDate(id);
        response.status(200).json(upDate);
    } catch (error) {
        response.status(400).json({ error: error.message });   
    }
};

module.exports = {
    postUser,
    getUserName,
    getIdUser,
    deleteUser,
    userPut
};