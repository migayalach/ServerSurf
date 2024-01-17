const { Router } = require("express");

const { postColor, getColorByName, getColorById, deleteColor, upDateColor } = require("../handlers/colorHandler");

const colorRouter = Router();

colorRouter.post("/", postColor); //OK.
colorRouter.get("/", getColorByName); //OK.
colorRouter.get("/:idColor", getColorById); //OK.
colorRouter.delete("/:idColor", deleteColor); //OK.
colorRouter.put("/", upDateColor); //OK.


module.exports = colorRouter;