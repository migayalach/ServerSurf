const { Router } = require("express");
const {
  postProduct,
  getNameProduct,
  getIdProduct,
  productDeleted,
  productUpdated,
  productStatusUpdated
} = require("../handlers/productHandler");

const productRouter = Router();

productRouter.post("/", postProduct);
productRouter.get("/", getNameProduct);
productRouter.get("/:idProduct", getIdProduct);
productRouter.delete("/:idProduct", productDeleted);
productRouter.put("/", productUpdated);
productRouter.put("/update",productStatusUpdated);

module.exports = productRouter;
