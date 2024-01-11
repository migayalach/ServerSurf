const { Router } = require("express");

const { postLevel, getLevelName, getIdLevel, deleteLevel, levelPut } = require("../handlers/levelHandler");

const levelRouter = Router();

levelRouter.post("/", postLevel);//ok
levelRouter.get("/", getLevelName); //OK -falta el name mejorar
levelRouter.get("/:idLevel", getIdLevel);//ok
levelRouter.delete("/:idLevel", deleteLevel);//ok
levelRouter.put("/", levelPut);

module.exports = levelRouter;
