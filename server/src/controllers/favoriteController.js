const { User, Product, Favorites } = require("../dataBase/dataBase");

const addFavorite = async (idUser, idProduct) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    throw Error`El usiario no existe`;
  }
  const existProduct = await Product.findOne({ where: { idProduct } });
  if (!existProduct) {
    throw Error`El producto no existe`;
  }

  const duplicateFavorite = await Favorites.findAll({
    where: {
      idUser,
    },
    attributes: ["idProduct"],
  });

  const favoriteArray = duplicateFavorite
    .map(({ idProduct }) => idProduct)
    .includes(idProduct);

  if (favoriteArray) {
    throw Error`Lo siento no puede haber duplicados`;
  }

  await Favorites.create({ idUser, idProduct });
  return `Añadido el producto con exito a favoritos`;
};

const deleteFavorite = (id) => {
  return `se borro el producto ${id}`;
};

module.exports = {
  addFavorite,
  deleteFavorite,
};
