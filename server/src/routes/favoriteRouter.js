const { Router } = require("express");

const {postFav, deleteFav} = require("../handlers/favoriteHandler");

const favoriteRouter = Router();

favoriteRouter.post("/", postFav);  //OK
favoriteRouter.delete("/:idUser/:idProduct", deleteFav);

module.exports = favoriteRouter;
