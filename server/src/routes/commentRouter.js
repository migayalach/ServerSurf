const { Router } = require("express");

const {
  postComment,
  updateComment,
  deleteComment,
  getIdComment,
  getDetComment,
} = require("../handlers/commentHandler");

const commentRouter = Router();

// ENTRY POIN'S
commentRouter.post("/", postComment);
commentRouter.put("/", updateComment);
commentRouter.delete("/:idComment", deleteComment);
commentRouter.get("/:idComment", getIdComment);
commentRouter.get("/", getDetComment);

module.exports = commentRouter;
