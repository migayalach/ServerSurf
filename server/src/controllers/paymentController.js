require("dotenv").config;
const { createSale } = require("./saleController")
const { createDetail } = require("./detailController")
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
            id: item.id,
            title: item.name,
            unit_price: item.price,
            picture_url: item.image,
            quantity: item.quantity,
            
          };
        }),
        back_urls: {
          failure: "https://client-server-okg3.vercel.app/",
          pending: "https://client-server-okg3.vercel.app/",
          success: "https://client-server-okg3.vercel.app/my-buys",
        },
        notification_url: "https://surf-4i7c.onrender.com/surf/mecado/webhook",
      });
  
      const order = placeOrder.body.init_point;
      
      return order;
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  };

  const webHook = async (payment) => {
    if (payment.type == "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
  
      const items = data.body.additional_info.items;
  
      if (data.body.status === 'approved') {
        console.log("Items:", items);
  
        let totalCost = 0;
  
        
        for (const item of items) {
          console.log("Processing item:", item);
          
          totalCost += parseFloat(item.unit_price);
        }
  
        
        await createSale(items[0].category_id, totalCost);
      } else {
        console.log("Payment not approved");
      }
  
      return data;
    }
  };
  
  
  module.exports = { createOrder, webHook };
