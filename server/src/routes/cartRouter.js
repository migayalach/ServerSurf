const { Router } = require("express");
const { postCart, deleteCart } = require("../handlers/cartHandler");

const cartRouter = Router();

cartRouter.post("/", postCart);     //OK
cartRouter.get("", );
cartRouter.put("/");
cartRouter.delete("");

module.exports = cartRouter;
