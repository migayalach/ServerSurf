const {
  addFavorite,
  deleteFavorite,
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

const deleteFav = (req, res) => {
  const { idFavorite } = req.params;
  try {
    const response = deleteFavorite(idFavorite);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postFav,
  deleteFav,
};
