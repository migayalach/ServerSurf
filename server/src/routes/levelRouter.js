const { Router } = require("express");

const { postLevel } = require("../handlers/levelHandler");

const levelRouter = Router();

levelRouter.post("/", postLevel);

module.exports = levelRouter;
