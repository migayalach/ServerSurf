const { Router } = require("express");

const {postColor, getColorByName, getColorById, deleteColor, upDateColor}= require("../handlers/colorHandler");

const colorRouter = Router();

colorRouter.post("/", postColor);
colorRouter.get("/", getColorByName);
colorRouter.get("/:idColor", getColorById);
colorRouter.delete("/:idColor", deleteColor);
colorRouter.put("/", upDateColor);


module.exports = colorRouter;
