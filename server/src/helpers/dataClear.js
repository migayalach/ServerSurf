const clearObj = (
  {
    idProduct,
    idCategory,
    idColor,
    idBrand,
    idSize,
    code,
    name,
    image,
    priceProduct,
    stock,
    status,
    description,
  },
  nameCategory,
  brandName,
  nameColor,
  nameSize
) => {
  return {
    idProduct,
    idCategory,
    idColor,
    idBrand,
    idSize,
    name,
    nameCategory,
    brandName,
    nameColor,
    nameSize,
    code,
    image,
    priceProduct,
    stock,
    status,
    description,
  };
};

module.exports = {
  clearObj,
};
