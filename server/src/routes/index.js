const { Router } = require("express");
const mainRouter = Router();

// route's
const levelRouter = require("./levelRouter");

// entry points
mainRouter.use("/level", levelRouter);

module.exports = mainRouter;
