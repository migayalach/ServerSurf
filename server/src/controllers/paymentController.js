require("dotenv").config;
// const {TOKEN_MP} = process.env;
const mercadopago = require("mercadopago");
const token = "TEST-8794393437302803-012315-ab82b0e8b423a272fab62356e23d359d-1650020163";
  
  const createOrder = async (items) => {
    try {
  
      mercadopago.configure({
        access_token: "TEST-8794393437302803-012315-ab82b0e8b423a272fab62356e23d359d-1650020163",
      
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
          failure: "https://client-server-swart.vercel.app/",
          pending: "https://client-server-swart.vercel.app/",
          success: "https://client-server-swart.vercel.app/",
        },
        notification_url: "https://client-server-swart.vercel.app/",
      });
  
      const order = placeOrder.body.init_point;
      
      return order;
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  };
  
  module.exports = { createOrder };
