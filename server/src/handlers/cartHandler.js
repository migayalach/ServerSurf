const { addCart, cartDelete } = require("../controllers/cartController");

const postCart = async (request, response) => {
  const { idProduct, idUser, amount } = request.body;
  try {
    const cartAdd = await addCart(+idProduct, idUser, amount);
    response.status(200).json(cartAdd);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteCart = (request, response) => {
  try {
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCart,
  deleteCart,
};
