const { Router } = require("express");

const {postFav, deleteFav, favoritesAll, getFavoriteById} = require("../handlers/favoriteHandler");

const favoriteRouter = Router();

favoriteRouter.post("/", postFav);  //OK
favoriteRouter.delete("/:idUser/:idProduct", deleteFav);
favoriteRouter.get('/', favoritesAll)
favoriteRouter.get("/:idUser", getFavoriteById)

module.exports = favoriteRouter;