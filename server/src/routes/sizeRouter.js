const { Router } = require("express");

const { postSize, getSizeByName, getSizeById, deleteSize, upDateSize } = require("../handlers/sizeHandler");

const sizeRouter = Router();

sizeRouter.post("/", postSize);
sizeRouter.get("/", getSizeByName);
sizeRouter.get("/:idSize", getSizeById);
sizeRouter.delete("/:idSize", deleteSize);
sizeRouter.put("/", upDateSize );

module.exports = sizeRouter;