const userAccess = require("../controllers/loginController");

const postLogin = async (request, response) => {
  const { nameUser, emailUser, password, uniqueId } = request.body;
  const userName = nameUser;
  try {
    const { access, idLevel, idUser, level, nameUser, message } =
      await userAccess(userName, emailUser, password, uniqueId);
    response
      .status(200)
      .json({ access, idLevel, idUser, emailUser, level, nameUser, message });
  } catch (error) {
    response.status(400).json({ access: false, message: error.message });
  }
};

module.exports = postLogin;
