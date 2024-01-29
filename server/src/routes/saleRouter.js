const { Router } = require("express");
const {
  postSale,
  getNameSale,
  getIdSale,
  saleDeleted,
  saleUpdated,
} = require("../handlers/salerHandler");

const saleRouter = Router();

saleRouter.post("/", postSale);
saleRouter.get("/", getNameSale);
saleRouter.get("/:idSale", getIdSale);
saleRouter.delete("/:idSale/:idUser", saleDeleted);
// saleRouter.put("/", saleUpdated);

module.exports = saleRouter;
