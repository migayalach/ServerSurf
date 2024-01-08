const { Router } = require("express");

const {
  postUser,
  getUserName,
  getIdUser,
  deleteUser,
  userPut,
} = require("../handlers/userHandler");

const userRouter = Router();

userRouter.post("/", postUser); //ok
userRouter.get("/", getUserName);
userRouter.get("/:idUser", getIdUser); //ok
userRouter.delete("/:idUser", deleteUser);
userRouter.put("/", userPut);

module.exports = userRouter;
