const { Router } = require("express");

const { postCategory, getCategoryByName, getCategoryById, deleteCategory, upDateCategory } = require("../handlers/categoryHandler");

const categoryRouter = Router();

categoryRouter.post("/", postCategory); //OK.
categoryRouter.get("/", getCategoryByName); //OK.
categoryRouter.get("/:idCategory", getCategoryById); //OK.
categoryRouter.delete("/:idCategory", deleteCategory); //OK.
categoryRouter.put("/", upDateCategory) //OK.


module.exports = categoryRouter;
