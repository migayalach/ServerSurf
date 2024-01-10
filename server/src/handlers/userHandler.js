const {
  createUser,
  getNameUser,
  getAllUser,
  getUserId,
  userDelete,
  userUpDate,
} = require("../controllers/userController");

const postUser = async (request, response) => {
  const { idLevel, nameUser, emailUser, user, password } = request.body;
  try {
    const newUser = await createUser(
      idLevel,
      nameUser,
      emailUser,
      user,
      password
    );
    response.status(200).json({ create: true, newUser });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getUserName = async (request, response) => {
  const { name } = request.query;
  try {
    if (name) {
      const userName = await getNameUser(name);
      response.status(200).json(userName);
    } else {
      const allUsers = await getAllUser();
      response.status(200).json(allUsers);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdUser = async (request, response) => {
  const { idUser } = request.params;
  try {
    const userFind = await getUserId(idUser);
    response.status(200).json(userFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteUser = async (request, response) => {
  const { idUser } = request.params;
  try {
    const userFind = await userDelete(idUser);
    response.status(200).json(userFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const userPut = async (request, response) => {
  const { idUser, idLevel, nameUser, emailUser, user, password } = request.body;
  try {
    const upDate = await userUpDate(idUser, idLevel, nameUser, emailUser, user, password);
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
  userPut,
};
