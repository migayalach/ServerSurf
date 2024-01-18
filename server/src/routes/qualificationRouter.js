const { Router } = require("express");

const { postQualification, getQualificationByName, getQualificationById, deleteQualification, upDateQualification } = require("../handlers/qualificationHandler");

const qualificationRouter = Router();

qualificationRouter.post("/", postQualification); //OK.
qualificationRouter.get("/", getQualificationByName); //OK.
qualificationRouter.get("/:idQualification", getQualificationById); //OK.
qualificationRouter.delete("/:idUser/:idProduct", deleteQualification); //OK.
qualificationRouter.put("/", upDateQualification); //OK.

module.exports = qualificationRouter;