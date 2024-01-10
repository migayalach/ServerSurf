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
qualificationRouter.post("/", postQualification); //OK
qualificationRouter.put("/", updateQualification); //OK
qualificationRouter.delete("/:idUser/:idProduct", deleteQualification);//OK
qualificationRouter.get("/:idQualification", getIdQualification);
qualificationRouter.get("/", getQualification); //OK busqueda por todo, falta por nombre

module.exports = qualificationRouter;
