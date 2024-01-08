const { Router } = require("express");

const { postLevel, getLevelName, getIdLevel } = require("../handlers/levelHandler");

const levelRouter = Router();

levelRouter.post("/", postLevel);

levelRouter.get("/", getLevelName);
levelRouter.get("/:id", getIdLevel);

module.exports = levelRouter;
