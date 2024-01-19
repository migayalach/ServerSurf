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
const brandRouter = require("./brandRouter");
const colorRouter = require("./colorRouter");
const loginRouter = require("./loginRouter");
const sizeRouter = require("./sizeRouter");
const paymentRouter = require("./paymentRouter");
const filterProductRouter = require("./filterProductRouter");

// entry points
mainRouter.use("/level", levelRouter); //ok
mainRouter.use("/user", userRouter); //ok
mainRouter.use("/category", categoryRouter); //ok
mainRouter.use("/product", productRouter); //ok
mainRouter.use("/qualification", qualificationRouter);
mainRouter.use("/favorite", favoriteRouter);
mainRouter.use("/cart", cartRouter); //ok
mainRouter.use("/sale", saleRouter); //o
mainRouter.use("/detail", detailRouter); //o
mainRouter.use("/brand", brandRouter);
mainRouter.use("/color", colorRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/size", sizeRouter);
mainRouter.use("/mecado", paymentRouter);
mainRouter.use("/filterProduct", filterProductRouter);

module.exports = mainRouter;
