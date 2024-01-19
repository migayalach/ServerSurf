const {
  addFavorite,
  allFavorites,
  deleteFavorite,
  favoriteById
} = require("../controllers/favoriteController");

const postFav = async (request, response) => {
  const { idUser, idProduct } = request.body;
  try {
    const newFavorite = await addFavorite(idUser, +idProduct);
    response.status(200).json(newFavorite);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const favoritesAll = async (request, response) => {
  try {
    const favorites = await allFavorites();
    response.status(200).json(favorites);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getFavoriteById = async (request, response) => {
  const { idUser } = request.params;
  try {
    const favoriteFind = await favoriteById(idUser);
    response.status(200).json(favoriteFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteFav = async (request, response) => {
  const { idUser, idProduct } = request.params;
  try {
    const result = await deleteFavorite(+idUser, +idProduct);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postFav,
  deleteFav,
  favoritesAll,
  getFavoriteById
};