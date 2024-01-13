const { Router } = require("express");
const {
  postSale,
  getNameSale,
  getIdSale,
  saleDeleted,
  saleUpdated,
} = require("../handlers/salerHandler");

const saleRouter = Router();

saleRouter.post("/", postSale); //ok --- falta detalle
saleRouter.get("/", getNameSale);
saleRouter.get("/:id", getIdSale);
saleRouter.delete("/:id", saleDeleted);
saleRouter.put("/", saleUpdated);

module.exports = saleRouter;
