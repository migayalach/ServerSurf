const { Router } = require("express");

const {
  getCategory,
  getCategoryById,
  getCategoryByName,
  postCategory,
  deleteCategory,
  updateCategory,
} = require("../handlers/categoryHandler");

const categoryRouter = Router();

categoryRouter.get("/:idCategory", getCategoryById); //ok
categoryRouter.get("/", getCategoryByName); //ok
categoryRouter.post("/", postCategory); //ok
categoryRouter.delete("/:idCategory", deleteCategory); //ok
categoryRouter.put("/", updateCategory) //ok


module.exports = categoryRouter;
