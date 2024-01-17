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
    return {
      level: false,
      message: 'Lo siento no puede haber duplicados',
      data: []
    }
  }

  await Favorites.create({ idUser, idProduct });

  const { data } = await allFavorites()
  return {
    level: true,
    message: `Añadido el producto con éxito a favoritos`,
    data
  };
};

const allFavorites = async () => {
  const dataFavorite = await Favorites.findAll({
    include: [
      {
        model: User,
        attributes: ["nameUser"],
      },
      {
        model: Product,
        attributes: ["name", "priceProduct", "image"],
      },
    ],
  });

  const formatteData = {
    level: true,
    message: 'Lista de favoritos',
    data: dataFavorite.map((fav) => ({
      idUser: fav.idUser,
      nameUser: fav.User.nameUser,
      idProduct: fav.idProduct,
      name: fav.Product.name,
      priceProduct: fav.Product.priceProduct,
      image: fav.Product.image,
    })),
  }
  return formatteData;
};

const deleteFavorite = async (idUser, idProduct) => {

  const favorite = await Favorites.findOne({
    where: {
      idUser,
      idProduct,
    },
  });
  
  if (!favorite) {
    return {
      level: false,
      message: 'Producto favorito no encontrado',
      data: []
    }
  }

  const deleted = await Favorites.destroy({where: {idUser, idProduct}});
  const { data } = await allFavorites()
  if (deleted) {
    return {
      level: true,
      message: 'Favorito eliminado correctamente',
      data
    }
  } 
};

module.exports = {
  addFavorite,
  allFavorites,
  deleteFavorite,
};