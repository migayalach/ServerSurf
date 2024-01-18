require("dotenv").config;
// const {TOKEN_MP} = process.env;
const mercadopago = require("mercadopago");
const token =
  "TEST-7135432371790350-011815-577077293356b643220780eb8c982e89-1104630405";

const createOrder = async (items) => {
  mercadopago.configure({
    access_token: token,
  });

  //PRECIO, NOMBRE, CANTIDAD, IMAGEN, DESCRIP, 
  const placeOrder = await mercadopago.preferences.create({
    items: items.map((item) => {
      return {
        category_id: item.userId,
        description: item.eventTitle,
        id: item.id,
        title: item.name,
        unit_price: item.price,
        picture_url: item.image,
        quantity: item.quantity,
      };
    }),
    back_urls: {
      failure: "https://lighthearted-entremet-b6aec9.netlify.app/",
      pending: "https://lighthearted-entremet-b6aec9.netlify.app/pending",
      //success:"http://localhost:3000/event",

      success: "https://lighthearted-entremet-b6aec9.netlify.app/",
    },
    notification_url:
      "https://server-eventifypro.onrender.com/mercadoPago/webhook",
  });
  const order = placeOrder.body.init_point;

  return order;
};
module.exports = { createOrder };
