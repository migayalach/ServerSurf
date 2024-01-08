const createUser = (name) => {
    return name;
};

const getNameUser = (name) => {
    return name;
};

const getUserId = (id) => {
    return id;
};

const getAllUser = () => {
    return 'Todos los users';
};

const userDelete = (id) => {
    return 'Elimina el user ' + id;
};

const userUpDate = (id) => {
    return 'Actualiza el user ' + id;
};

module.exports = {
    createUser,
    getNameUser,
    getUserId,
    getAllUser,
    userDelete,
    userUpDate
};