const { Router } = require("express");
const { validateLogin } = require("../middleware/loginMiddleware");
const postLogin = require("../handlers/loginHandler");

const loginRouter = Router();

loginRouter.post("/", 
//validateLogin, 
postLogin);

module.exports = loginRouter;
