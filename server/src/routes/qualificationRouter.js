const { Router } = require("express");

const {
  postQualification,
  updateQualification,
  deleteQualification,
  getIdQualification,
  getQualification,
} = require("../handlers/qualificationHandler");

const qualificationRouter = Router();

// ENTRY POIN'S
qualificationRouter.post("/", postQualification);
qualificationRouter.put("/", updateQualification);
qualificationRouter.delete("/:idQualification", deleteQualification);
qualificationRouter.get("/:idQualification", getIdQualification);
qualificationRouter.get("/", getQualification);

module.exports = qualificationRouter;
