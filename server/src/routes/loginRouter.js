const { Router } = require("express");
const postLogin = require("../handlers/loginHandler");

const loginRouter = Router();

loginRouter.post("/", postLogin);

module.exports = loginRouter;
