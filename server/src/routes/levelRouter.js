const { Router } = require("express");

const { postLevel, getLevelName, getIdLevel, deleteLevel, levelPut } = require("../handlers/levelHandler");

const levelRouter = Router();

levelRouter.post("/", postLevel);
levelRouter.get("/", getLevelName); 
levelRouter.get("/:idLevel", getIdLevel);
levelRouter.delete("/:idLevel", deleteLevel);
levelRouter.put("/", levelPut);

module.exports = levelRouter;
