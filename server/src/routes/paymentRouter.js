const { Router } = require("express");
const {
  createPaymentHandler,
  successPaymentHandler,
  pendingPaymentHandler,
  webHookHandler,
} = require("../handlers/paymentHandler");

const paymentRouter = Router();

paymentRouter.post("/", createPaymentHandler);
paymentRouter.get("/success", successPaymentHandler);
paymentRouter.get("/pending", pendingPaymentHandler);
paymentRouter.post("/webhook", webHookHandler);

module.exports = paymentRouter;
