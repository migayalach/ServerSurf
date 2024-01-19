const valor = (text) => {
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

  // TODO
  return orderByASCDESC(
    (auxCategori = listProducts
      .filter((index) => index.idCategory === +idCategory)
      .filter((index) => index.idColor === +idColor)
      .filter((index) => index.idSize === +idSize)
      .filter((index) => index.idBrand === +idBrand)
      .filter(
        (index) =>
          index.priceProduct > minPrice && index.priceProduct < maxPrice
      )),
    orderBy,
    key
  );
};

module.exports = searchProductData;

//* CASOS - TODO EN 1
//!   TRAER TODOS LOS PRODUCTOS DE UNA CATEGORIA                          2         OK
//!   TRAER TODOS LOS PRODUCTOS DE UN COLOR                               3         OK
//!   TRAER TODOS LOS PRODUCTOS DE UNA TALLA                              4
//!   TRAER TODOS LOS PRODUCTOS DE UNA MARCA
//!   TRAER TODOS LOS PRODUCTOS DE UN RANGO DE PRECIO DE INICIO Y FIN   10 - 73
//!   ORDENAR ASC O DESC - PRECIO o NOMBRE                                ACS
//!   SI NO ENCUIENTRA NADA DEVOLVER TODO O NADA ---
//*  [1,2,3,4] === [1,2,3,4] si es igualito devolver no se encontro nada

//* CASO 2 - CASOS SEPARADOS -- {}
//!   TRAER TODOS LOS PRODUCTOS DE UNA CATEGORIA  
//!   TRAER TODOS LOS PRODUCTOS DE UN COLOR
//!   TRAER TODOS LOS PRODUCTOS DE UNA TALLA 
//!   TRAER TODOS LOS PRODUCTOS DE UNA MARCA
//!   TRAER TODOS LOS PRODUCTOS DE UN RANGO DE PRECIO DE INICIO Y FIN   10 - 73
//!   ORDENAR ASC O DESC - PRECIO o NOMBRE   