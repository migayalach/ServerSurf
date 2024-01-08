const { Router } = require("express");

const {postFav, deleteFav} = require("../handlers/favoriteHandler");

const favoriteRouter = Router();

favoriteRouter.post("/", postFav);

favoriteRouter.delete("/:id", deleteFav);

module.exports = favoriteRouter;
