const { Router } = require("express");
const getfilterProduct = require("../handlers/filterProductHandler");

const filterProductRouter = Router();

filterProductRouter.get("/", getfilterProduct);
module.exports = filterProductRouter;
