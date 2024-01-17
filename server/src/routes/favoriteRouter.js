const { Router } = require("express");

const {postFav, deleteFav, favoritesAll} = require("../handlers/favoriteHandler");

const favoriteRouter = Router();

favoriteRouter.post("/", postFav);  //OK
favoriteRouter.delete("/:idUser/:idProduct", deleteFav);
favoriteRouter.get('/', favoritesAll)

module.exports = favoriteRouter;