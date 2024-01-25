const { User, Product, Favorites } = require("../dataBase/dataBase");

const addFavorite = async (idUser, idProduct) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    return {
      level: false,
      message: `El usario con ID: ${idUser} no existe`,
      data: []
    }
  }
  const existProduct = await Product.findOne({ where: { idProduct } });
  if (!existProduct) {
    return {
      level: false,
      message: `El producto con ID: ${idProduct} no existe`,
      data: []
    }
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
      message: 'Lo siento no puede haber favoritos duplicados',
      data: []
    }
  }

  await Favorites.create({ idUser, idProduct });

  const addedProduct = await Product.findOne({ where: { idProduct } });

  const { data } = await favoriteById(idUser)
  return {
    level: true,
    message: `Añadido el producto ${addedProduct.name} con éxito a favoritos`,
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

const favoriteById = async (idUser) => {
  const favorites = await Favorites.findAll({
    where: {
      idUser,
    },
    include: [
      {
        model: Product,
        attributes: ["name", "priceProduct", "image"],
      },
      {
        model: User,
        attributes: ["nameUser"]
      }
    ],
  });

  if (favorites.length > 0) {
    return {
      level: true,
      message: `Lista de favoritos para el usuario con ID: ${idUser}`,
      data: favorites.map((fav) => ({
        nameUser: fav.User.nameUser,
        idProduct: fav.idProduct,
        name: fav.Product.name,
        priceProduct: fav.Product.priceProduct,
        image: fav.Product.image,
      })),
    };
  } else {
    return {
      level: false,
      message: `No se encontraron favoritos para el usuario con ID: ${idUser}`,
      data: [],
    };
  }
};

const deleteFavorite = async (idUser, idProduct) => {

  const favoriteUser = await Favorites.findOne({
    where: {
      idUser
    },
  });
  
  if (!favoriteUser) {
    return {
      level: false,
      message: `El user con ID: ${idUser} no tiene favoritos`,
      data: []
    }
  }

  const favoriteProduct = await Favorites.findOne({
    where: {
      idProduct
    }
  });

  if (!favoriteProduct) {
    return {
      level: false,
      message: `El producto con ID: ${idProduct} no esta en favoritos`,
      data: []
    }
  }

  const deleted = await Favorites.destroy({ where: { idUser, idProduct } });
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
  favoriteById,
};