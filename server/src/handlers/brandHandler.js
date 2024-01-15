const {
    createBrand,
    brandByName,
    brandById,
    allBrand,
    brandDelete,
    brandUpDate
} = require('../controllers/brandController')

const postBrand = async (request, response) => {
    const { name } = request.body;
    try {
      const responseData = await createBrand(name);
      response.status(200).json(responseData);
    } catch (error) {
      response.status(400).json({ brand: false, error: error.message });
    }
  };
  
  const getBrandByName = async (request, response) => {
    const { name } = request.query;
    try {
      if(name){
        const brandName = await brandByName(name);
        response.status(200).json(brandName);
      } else {
        const allbrands = await allBrand();
        response.status(200).json(allbrands);
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  };
  
  const getBrandById = async (request, response) => {
    const { idBrand } = request.params;
    try {
      const brandFind = await brandById(idBrand);
      response.status(200).json(brandFind);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  };
  
  const deleteBrand = async (request, response) => {
    const { idBrand } = request.params;
    try {
      const brandFound = await brandDelete(idBrand);
      response.status(200).json(brandFound);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  };
  
  const upDateBrand = async (request, response) => {
    const { idBrand, brandName } = request.body;
    try {
      const upDatedBrand = await brandUpDate(idBrand, brandName);
      response.status(200).json(upDatedBrand);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    postBrand,
    getBrandByName,
    getBrandById,
    deleteBrand,
    upDateBrand
  };