const { Router } = require("express");

const { postLevel, getLevelName, getIdLevel, deleteLevel, levelPut } = require("../handlers/levelHandler");

const levelRouter = Router();

levelRouter.post("/", postLevel);   //oK
levelRouter.get("/", getLevelName); //ok all, falta la buqueda por name
levelRouter.get("/:idLevel", getIdLevel); //busqueda por id
levelRouter.delete("/:idLevel", deleteLevel); // eliminar por id
levelRouter.put("/", levelPut); //editar datos

module.exports = levelRouter;
