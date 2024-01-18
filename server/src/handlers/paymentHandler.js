const { createOrder } = require("../controllers/paymentController");

const createPaymentHandler = async (request, response) => {
  const listCartItems = request.body;
  try {
    const newOrder = await createOrder(listCartItems);
    response.status(201).json(newOrder);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const webHookHandler = async (request, response) => {
  const payment = request.query;
  try {
    const newPayment = await webHook(payment);
    response.status(201).json(newPayment);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const successPaymentHandler = (request, response) => {
  try {
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};
const pendingPaymentHandler = (request, response) => {
  try {
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPaymentHandler,
  successPaymentHandler,
  pendingPaymentHandler,
  webHookHandler,
};
