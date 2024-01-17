const userAccess = require("../controllers/loginController");

const postLogin = async (request, response) => {
  const { email, password } = request.body;
  try {
    const { access, idLevel, idUser, name, level, message } = await userAccess(
      email,
      password
    );
    response
      .status(200)
      .json({ access, idLevel, idUser, name, level, message });
  } catch (error) {
    response.status(400).json({ access: false, message: error.message });
  }
};

module.exports = postLogin;
