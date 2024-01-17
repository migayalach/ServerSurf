const { Router } = require("express");

const { postSize, getSizeByName, getSizeById, deleteSize, upDateSize } = require("../handlers/sizeHandler");

const sizeRouter = Router();

sizeRouter.post("/", postSize); //OK.
sizeRouter.get("/", getSizeByName); //OK.
sizeRouter.get("/:idSize", getSizeById); //OK.
sizeRouter.delete("/:idSize", deleteSize); //OK.
sizeRouter.put("/", upDateSize ); //OK.

module.exports = sizeRouter;