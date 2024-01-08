const { addFavorite, deleteFavorite } = require("../controllers/favoriteController");

const postFav = (req, res) => {
    const favorite = req.body;
    try {
        const response = addFavorite(favorite);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteFav =  (req, res) => {
    const { id } = req.params;
    try {
        const response = deleteFavorite(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    postFav,
    deleteFav
};
