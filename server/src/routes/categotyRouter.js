const { Router } = require("express");

const { getCategory, postCategory, deleteCategory } = require("../handlers/categoryHandler");

const categoryRouter = Router();

categoryRouter.get("/", getCategory);

categoryRouter.post("/create", postCategory);

categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;
