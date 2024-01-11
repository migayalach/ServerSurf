const { User, Product, Favorites } = require("../dataBase/dataBase");

const addFavorite = async (idUser, idProduct) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    throw Error`El usario no existe`;
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
  return `Añadido el producto con éxito a favoritos`;
};

const deleteFavorite = async (idUser, idProduct) => {

  const favorite = await Favorites.findOne({
    where: {
      idUser,
      idProduct,
    },
  });

  if (!favorite) {
    throw new Error('Producto favorito no encontrado');
  }
  await Favorites.destroy({where: {idUser, idProduct}});

  return { success: true, message: 'Favorito eliminado correctamente' };

};

module.exports = {
  addFavorite,
  deleteFavorite,
};
