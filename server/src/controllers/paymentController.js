require("dotenv").config;
// const {TOKEN_MP} = process.env;
const mercadopago = require("mercadopago");
const token = "TEST-4630204173961447-011821-aaaf346216fd8f3d4cdc241d641b7a94-1643639191";
  
  const createOrder = async (items) => {
    try {
  
      mercadopago.configure({
        access_token: token,
      
      });
  
      const placeOrder = await mercadopago.preferences.create({
        items: items.map((item) => {
          return {
            category_id: item.userId,
            description: item.description,
            id: item.idProduct,
            title: item.name,
            unit_price: item.price,
            picture_url: item.image,
            quantity: item.quantity,
          };
        }),
        back_urls: {
          failure: "http://localhost:5173/",
          pending: "http://localhost:5173/",
          success: "http://localhost:5173/",
        },
        notification_url: "http://localhost:5173/",
      });
  
      const order = placeOrder.body.init_point;
      
      return order;
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  };
  
  module.exports = { createOrder };
