const { Router } = require("express");

const {
  postDetail,
  updateDetail,
  deleteDetail,
  getIdDetail,
  getDetailAll,
} = require("../handlers/detailHandler");

const detailRouter = Router();

// ENTRY POIN'S
detailRouter.get("/:idSale", getIdDetail);
detailRouter.post("/", postDetail);

// NO SE NECESITA ESTO PORQUE UN DETALLE NO PUEDE SER EDITADO, ELIMINADO, TRAER TODO 
detailRouter.put("/", updateDetail);
detailRouter.delete("/:idDetail", deleteDetail);
detailRouter.get("/", getDetailAll);

module.exports = detailRouter;
