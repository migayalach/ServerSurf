const { Router } = require("express");
const {
  postSale,
  getNameSale,
  getIdSale,
  saleDeleted,
  saleUpdated,
} = require("../handlers/salerHandler");

const saleRouter = Router();

saleRouter.post('/', postSale);
saleRouter.get('/', getNameSale);
saleRouter.get('/:id', getIdSale);
saleRouter.delete('/:id', saleDeleted);
saleRouter.put('/', saleUpdated)

module.exports = saleRouter;
