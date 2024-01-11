const { Router } = require("express");
const mainRouter = Router();

// route's
const levelRouter = require("./levelRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const saleRouter = require("./saleRouter");
const productRouter = require("./productRouter");
const favoriteRouter = require("./favoriteRouter");
const categoryRouter = require("./categotyRouter");
const detailRouter = require("./detailRouter");
const qualificationRouter = require("./qualificationRouter");

// entry points
mainRouter.use("/level", levelRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/qualification", qualificationRouter);
mainRouter.use("/favorite", favoriteRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/sale", saleRouter);
mainRouter.use("/detail", detailRouter);

module.exports = mainRouter;
