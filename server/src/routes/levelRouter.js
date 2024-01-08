const { Router } = require("express");

const { postLevel, getLevelName, getIdLevel, deleteLevel, levelPut } = require("../handlers/levelHandler");

const levelRouter = Router();

levelRouter.post("/", postLevel);

levelRouter.get("/", getLevelName);
levelRouter.get("/:id", getIdLevel);

levelRouter.delete("/:id", deleteLevel);

levelRouter.put("/", levelPut);

module.exports = levelRouter;
