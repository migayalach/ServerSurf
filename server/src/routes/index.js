const { Router } = require("express");
const mainRouter = Router();

// route's
const levelRouter = require("./levelRouter"); //MATY
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const saleRouter = require("./saleRouter");
const productRouter = require("./productRouter");
const favoriteRouter = require("./favoriteRouter");
const categoryRouter = require("./categotyRouter");
const detailRouter = require("./detailRouter");
const commentRouter = require("./commentRouter");

// entry points
mainRouter.use("/level", levelRouter); //MATY
mainRouter.use("/user", userRouter); //MATY
mainRouter.use("/cart", cartRouter); //MATY
mainRouter.use("/sale", saleRouter); //MARIANA
mainRouter.use("/product", productRouter); //MARIANA
mainRouter.use("/favorite", favoriteRouter); //MELANI
mainRouter.use("/category", categoryRouter); //MELANI
mainRouter.use("/detail", detailRouter);
mainRouter.use("/comment", commentRouter);

module.exports = mainRouter;

// busqueda por id, name, todo (name)  - GET
// agregar (name) - POST
// eliminar (name) - DELETE
// editar (name) - UPDATE
