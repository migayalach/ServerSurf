const {
    createProduct,
    getProductName,
    getProductId,
    getAllProducts,
    putProduct,
    deleteProduct
  } = require("../controllers/productController");
  
  const postProduct = (req, res) => {
      const {name} = req.body;
      try {
          const newProduct = createProduct(name);
          return res.status(200).json({create: true, newProduct})
      } catch (error) {
          return res.status(400).json({message: error.message})
      }
  };
  
  const getNameProduct = (req, res) => {
      const {name} = req.query;
      try {
       if(name){ 
          const sale = getProductName(name)
          return res.status(200).json(sale)
      } else {
          const allProducts = getAllProducts();
          return res.status(200).json(allProducts)
      }
      } catch (error) {
          return res.status(400).json({message: error.message})
      }
  };
  
  const getIdProduct = (req, res) => {
      const {id} = req.params;
      try {
          const foundProduct = getProductId(id);
          return res.status(200).json(foundProduct);
      } catch (error) {
          return res.status(400).json({message: error.message})
      }
  }
  
  const productDeleted = (req, res) => {
      const {id} = req.params;
      try {
       const productDelete = deleteProduct(id);
       return res.status(200).json(productDelete)
      } catch (error) {
       return res.status(400).json({message: error.message})  
      }
  };
  
  const productUpdated = (req, res) => {
      const {id} = req.body;
      try {
        const updatedProduct = putSales(id);
        return res.status(200).json(updatedProduct)    
      } catch (error) {
        return res.status(400).json({message: error.message})  
      }
  };
  
  module.exports = {
      postProduct,
      getNameProduct,
      getIdProduct,
      productDeleted,
      productUpdated
      
  }