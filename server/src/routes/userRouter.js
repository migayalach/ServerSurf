const { Router } = require("express");

const { postUser, getUserByName, getUserById, deleteUser, upDateUser } = require("../handlers/userHandler");

const userRouter = Router();

userRouter.post("/", postUser); //OK.
userRouter.get("/", getUserByName); //OK.
userRouter.get("/:idUser", getUserById); //OK.
userRouter.delete("/:idUser", deleteUser); //OK.
userRouter.put("/", upDateUser); //OK.

module.exports = userRouter;