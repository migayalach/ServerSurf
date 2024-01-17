const { Router } = require("express");

const { postBrand, getBrandByName, getBrandById, deleteBrand, upDateBrand } = require('../handlers/brandHandler')

const brandRouter = Router();

brandRouter.post("/", postBrand); //OK.
brandRouter.get("/", getBrandByName); //OK.
brandRouter.get("/:idBrand", getBrandById); //OK.
brandRouter.delete("/:idBrand", deleteBrand); //OK.
brandRouter.put("/", upDateBrand) //OK.

module.exports = brandRouter;