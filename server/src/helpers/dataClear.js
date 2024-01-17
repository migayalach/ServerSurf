const clearObj = (
  {
    idProduct,
    idCategory,
    idColor,
    idBrand,
    code,
    name,
    type,
    image,
    characteristics,
    priceProduct,
    stock,
    description,
  },
  nameCategory,
  brandName,
  nameColor
) => {
  return {
    idProduct,
    idCategory,
    idColor,
    idBrand,
    name,
    nameCategory,
    brandName,
    nameColor,
    code,
    type,
    image,
    characteristics,
    priceProduct,
    stock,
    description,
  };
};

module.exports = {
  clearObj,
};
