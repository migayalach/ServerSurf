const { User, Product, Cart } = require("../dataBase/dataBase");

const clearObj = (obj, producto) => {
  return {
    idProduct: producto.idProduct,
    code: producto.code,
    name: producto.name,
    type: producto.type,
    image: producto.image,
    characteristics: producto.characteristics,
    priceProduct: producto.priceProduct,
    amount: obj.amount,
  };
};

const clearData = async (arrayData) => {
  const promisse = arrayData.map(async ({ amount, idUser, idProduct }) => {
    const producto = await Product.findByPk(idProduct);
    const obj = {
      idUser,
      idProduct,
      amount,
    };
    return clearObj(obj, producto);
  });
  return await Promise.all(promisse);
};

const cartPromisseData = async (idUser) => {
  const arrayData = await Cart.findAll({
    where: { idUser },
  });
  return clearData(arrayData);
};

const costProduct = (array) => {
  let precio = 0;
  for (let i = 0; i < array.length; i++) {
    let sum = array[i].priceProduct * array[i].amount;
    precio = precio + sum;
    sum = 0;
  }
  return (precio = Math.round(precio * 100) / 100);
};

const getCartUserId = async (idUser) => {
  const costEnd = await cartPromisseData(idUser);
  return {
    message: "Carrito cargado satisfactoriamente",
    cost: costProduct(costEnd),
    cartList: costEnd,
  };
};

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
  const { cartList } = await getCartUserId(idUser);

  return {
    message: `Carrito lista`,
    cost: costProduct(cartList),
    cartList,
  };
};

const updateCart = async (idProduct, idUser, amount) => {
  if (amount < 0) {
    throw Error`Lo siento no hay stock negativo`;
  }
  const { stock } = await Product.findOne({ where: { idProduct } });
  if (amount <= stock) {
    await Cart.update({ amount }, { where: { idProduct, idUser } });
    const { cartList } = await getCartUserId(idUser);
    return {
      message: `Actualizacion completa`,
      cost: costProduct(cartList),
      cartList,
    };
  }
  throw Error`Lo siento la cantidad que intenta agregar: ${amount}, supera nuestro stock`;
};

const cartDelete = async (idUser) => {
  const existUser = await User.findOne({ where: { idUser } });
  if (!existUser) {
    throw Error`Lo siento el usario que introdujo no existe`;
  }
  await Cart.destroy({ where: { idUser } });
  const { cartList } = await getCartUserId(idUser);
  return { message: `success`, cost: costProduct(cartList), cartList };
};

module.exports = {
  getCartUserId,
  addCart,
  cartDelete,
  updateCart,
};
