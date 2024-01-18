const { Router } = require("express");

const { postQualification, getQualificationByName, getQualificationById, deleteQualification, upDateQualification } = require("../handlers/qualificationHandler");

const qualificationRouter = Router();

qualificationRouter.post("/", postQualification);
qualificationRouter.get("/", getQualificationByName);
qualificationRouter.get("/:idQualification", getQualificationById);
qualificationRouter.delete("/:idUser/:idProduct", deleteQualification);
qualificationRouter.put("/", upDateQualification);

module.exports = qualificationRouter;