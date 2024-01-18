const {
  addCart,
  cartDelete,
  getCartUserId,
  updateCart,
} = require("../controllers/cartController");

const getCartProduct = async (request, response) => {
  const { idUser } = request.params;
  try {
    const { message, cost, cartList } = await getCartUserId(idUser);
    response
      .status(200)
      .json({ cartUser: true, message, costSale: cost, cartList });
  } catch (error) {
    response
      .status(400)
      .json({ cartUser: false, message: error.message, cartList: [] });
  }
};

const postCart = async (request, response) => {
  const { idProduct, idUser, amount } = request.body;
  try {
    const { message, cost, cartList } = await addCart(
      +idProduct,
      idUser,
      amount
    );
    response
      .status(200)
      .json({ cartPost: true, message, costSale: cost, cartList });
  } catch (error) {
    const { cartList } = await getCartUserId(idUser);
    response.status(400).json({
      cartPost: false,
      message: error.message,
      cartList,
    });
  }
};

const putCart = async (request, response) => {
  const { idProduct, idUser, amount } = request.body;
  try {
    const { message, cost, cartList } = await updateCart(
      idProduct,
      idUser,
      +amount
    );
    response
      .status(200)
      .json({ cartPut: true, message, costSale: cost, cartList });
  } catch (error) {
    response
      .status(400)
      .json({ cartPut: false, message: error.message, cartList: [] });
  }
};

const deleteCart = async (request, response) => {
  const { idUser, idProduct } = request.params;
  try {
    const { message, cost, cartList } = await cartDelete(+idUser, idProduct);
    response
      .status(200)
      .json({ cartDelete: true, message, costSale: cost, cartList });
  } catch (error) {
    response.status(400).json({
      cartDelete: false,
      message: error.message,
      costSale: 0,
      cartList: [],
    });
  }
};

module.exports = {
  getCartProduct,
  postCart,
  putCart,
  deleteCart,
};
