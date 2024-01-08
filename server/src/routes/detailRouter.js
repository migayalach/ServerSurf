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
detailRouter.post("/", postDetail);
detailRouter.put("/", updateDetail);
detailRouter.delete("/:idDetail", deleteDetail);
detailRouter.get("/:idDetail", getIdDetail);
detailRouter.get("/", getDetailAll);

module.exports = detailRouter;
