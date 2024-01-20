const valor = (text) => {
  if (!text) {
    return 0
  }
  let character = text.split("")[0];
  return character.charCodeAt();
};

const orderByASCDESC = (array, search, key) => {
  let n = array.length,
    aux = 0,
    temp = 0;
  for (let i = 0; i < n - 1; i++) {
    aux = i;
    for (let j = i + 1; j < n; j++) {
      if (key === "priceProduct") {
        if (array[i].priceProduct > array[j].priceProduct) {
          aux = array[i];
          array[i] = array[j];
          array[j] = aux;
        }
      } else {
        let valor1 = valor(array[j][key]);
        let valor2 = valor(array[aux][key]);
        if (valor1 < valor2 && search === "ASC") aux = j;
        if (valor1 > valor2 && search === "DESC") aux = j;
        temp = array[aux];
        array[aux] = array[i];
        array[i] = temp;
      }
    }
  }
  return array;
};

const {
  Product,
  Category,
  Brand,
  Color,
  Size,
} = require("../dataBase/dataBase");

async function productClear(products) {
  const responseData = products.map(
    async ({
      idProduct,
      code,
      name,
      image,
      priceProduct,
      stock,
      description,
      status,
      idCategory,
      idColor,
      idBrand,
      idSize,
    }) => {
      const { nameCategory } = await Category.findByPk(idCategory);
      const { nameColor } = await Color.findByPk(idColor);
      const { brandName } = await Brand.findByPk(idBrand);
      const { nameSize } = await Size.findByPk(idSize);
      return (obj = {
        idProduct,
        idCategory,
        idColor,
        idBrand,
        idSize,
        name,
        priceProduct,
        stock,
        nameCategory,
        nameColor,
        brandName,
        nameSize,
        code,
        image,
        description,
        status,
      });
    }
  );
  return await Promise.all(responseData);
}

const searchProductData = async (
  idCategory,
  idColor,
  idSize,
  idBrand,
  minPrice,
  maxPrice,
  orderBy,
  key
) => {
  const listProducts = await productClear(await Product.findAll());

  if (idCategory && idColor && idSize && idBrand && minPrice && maxPrice) {
    const filteredProducts = listProducts
    .filter((index) => index.idCategory === +idCategory)
    .filter((index) => index.idColor === +idColor)
    .filter((index) => index.idSize === +idSize)
    .filter((index) => index.idBrand === +idBrand)
    .filter(
      (index) =>
        index.priceProduct >= minPrice && index.priceProduct <= maxPrice
    );

    if (filteredProducts.length > 0) {
      const orderedProducts = orderByASCDESC(filteredProducts, orderBy, key);
      return {
        level: true,
        message: 'Productos encontrados',
        data: orderedProducts,
      };
    } else {
      return {
        level: false,
        message: 'No se encontraron productos con los criterios especificados',
        data: [],
      };
    }
    // const orderedProducts = orderByASCDESC(filteredProducts, orderBy, key);
    // return {
    //   level: true,
    //   message: 'chau',
    //   data: orderedProducts
    // }
  }

  const filteredProducts = listProducts
  .filter((index) => (idCategory ? index.idCategory === +idCategory : true))
  .filter((index) => (idColor ? index.idColor === +idColor : true))
  .filter((index) => (idSize ? index.idSize === +idSize : true))
  .filter((index) => (idBrand ? index.idBrand === +idBrand : true))
  .filter(
    (index) => 
      (minPrice ? index.priceProduct >= minPrice : true) &&
      (maxPrice ? index.priceProduct <= maxPrice : true)
  );

  if (filteredProducts.length > 0) {
    const orderedProducts = orderByASCDESC(filteredProducts, orderBy, key);
    return {
      level: true,
      message: 'Productos encontrados',
      data: orderedProducts,
    };
  } else {
    return {
      level: false,
      message: 'No se encontraron productos con los criterios especificados',
      data: [],
    };
  }
  // const orderedProducts = orderByASCDESC(filteredProducts, orderBy, key);
  // return {
  //   level: true,
  //   message: 'hola',
  //   data: orderedProducts
  // }
};

module.exports = searchProductData;

//*  [1,2,3,4] === [1,2,3,4] si es igualito devolver no se encontro nada