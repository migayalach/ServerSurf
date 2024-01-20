const validateLogin = (request, response, next) => {
  const { email, password } = request.body;

  if (!email && !password) {
    return response
      .status(400)
      .json({ access: false, message: "Introduzca datos por favor" });
  }

  if (!email) {
    return response.status(400).json({ access: false, message: "Falta email" });
  }

  if (!password) {
    return response
      .status(400)
      .json({ access: false, message: "Falta la contraseña" });
  }

  next();
};

module.exports = { validateLogin };
