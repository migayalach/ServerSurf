const { User, Product, Cart } = require("../dataBase/dataBase");

const addCart = async (idProduct, idUser, amount) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    throw Error`El usiario no existe`;
  }
  const existProduct = await Product.findOne({ where: { idProduct } });
  if (!existProduct) {
    throw Error`El producto no existe`;
  }
  const duplicateCart = await Cart.findAll({
    where: {
      idUser,
    },
    attributes: ["idProduct"],
  });
  const favoriteArray = duplicateCart
    .map(({ idProduct }) => idProduct)
    .includes(idProduct);

  if (favoriteArray) {
    throw Error`Lo siento no puede haber duplicados`;
  }

  await Cart.create({ idProduct, idUser, amount });
  return await getDetailCart(idUser);
};

const getDetailCart = async (idUser) => {
  return await Cart.findAll({ where: { idUser } });
};

const cartDelete = () => {};

module.exports = {
  addCart,
  cartDelete,
};
