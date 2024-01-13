const { Router } = require("express");
const {
  postCart,
  deleteCart,
  getCartProduct,
  putCart,
} = require("../handlers/cartHandler");

const cartRouter = Router();

cartRouter.get("/:idUser", getCartProduct);
cartRouter.post("/", postCart);
cartRouter.put("/", putCart);
cartRouter.delete("/:idUser", deleteCart);

module.exports = cartRouter;
