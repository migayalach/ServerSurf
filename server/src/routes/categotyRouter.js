const { Router } = require("express");

const {
  getCategory,
  postCategory,
  deleteCategory,
} = require("../handlers/categoryHandler");

const categoryRouter = Router();

categoryRouter.get("/", getCategory); //ok
categoryRouter.post("/", postCategory); //ok
categoryRouter.delete("/:id", deleteCategory);
//FALTA EDITAR
//MOSTRAR por id, name

module.exports = categoryRouter;
