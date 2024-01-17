const { Router } = require("express");

const { postLevel, getLevelByName, getLevelById, deleteLevel, upDateLevel } = require("../handlers/levelHandler");

const levelRouter = Router();

levelRouter.post("/", postLevel);//OK.
levelRouter.get("/", getLevelByName); //OK.
levelRouter.get("/:idLevel", getLevelById);//OK.
levelRouter.delete("/:idLevel", deleteLevel);//OK.
levelRouter.put("/", upDateLevel);//OK.

module.exports = levelRouter;