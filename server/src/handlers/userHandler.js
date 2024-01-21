const {
  createUser,
  userByName,
  userById,
  allUser,
  userDelete,
  userUpDate,
} = require("../controllers/userController");

const FirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const postUser = async (request, response) => {
  const { nameUser, emailUser, password, uniqueId } = request.body;
  const convierteUserName = FirstLetter(nameUser);
  try {
    const newUser = await createUser(
      convierteUserName,
      emailUser,
      password,
      uniqueId
    );
    response.status(200).json(newUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};






const getUserByName = async (request, response) => {
  const { name } = request.query;
  try {
    if (name) {
      const userName = await userByName(name);
      response.status(200).json(userName);
    } else {
      const allUsers = await allUser();
      response.status(200).json(allUsers);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getUserById = async (request, response) => {
  const { idUser } = request.params;
  try {
    const userFind = await userById(idUser);
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

const upDateUser = async (request, response) => {
  const { idUser, idLevel, nameUser, emailUser, lastName, password } =
    request.body;
  const convierteUserName = FirstLetter(nameUser);
  const convierteLastName = FirstLetter(lastName);
  try {
    const upDate = await userUpDate(
      idUser,
      idLevel,
      convierteUserName,
      emailUser,
      convierteLastName,
      password
    );
    response.status(200).json(upDate);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postUser,
  getUserByName,
  getUserById,
  deleteUser,
  upDateUser,
};
