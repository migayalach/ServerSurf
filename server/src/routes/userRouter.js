const { Router } = require("express");

const { postUser, getUserName, getIdUser, deleteUser, userPut } = require("../handlers/userHandler");

const userRouter = Router();

userRouter.post("/", postUser);

userRouter.get("/", getUserName);
userRouter.get("/:id", getIdUser);

userRouter.delete("/:id", deleteUser);

userRouter.put("/", userPut);

module.exports = userRouter;
