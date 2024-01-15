const userAccess = require("../controllers/loginController");

const postLogin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const { access, message, idUser, name } = await userAccess(email, password);
    response.status(200).json({ access, message, idUser, name });
  } catch (error) {
    response.status(400).json({ access: false, message: error.message });
  }
};

module.exports = postLogin;
