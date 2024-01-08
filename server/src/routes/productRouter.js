const { Router } = require("express");
const {
  postProduct,
  getNameProduct,
  getIdProduct,
  productDeleted,
  productUpdated,
} = require("../handlers/productHandler");

const productRouter = Router();

productRouter.post('/', postProduct);
productRouter.get('/', getNameProduct);
productRouter.get('/:id', getIdProduct);
productRouter.delete('/:id', productDeleted);
productRouter.put('/', productUpdated)

module.exports = productRouter;