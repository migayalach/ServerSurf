const valor = (text) => {
  let character = text.split("")[0];
  return character.charCodeAt();
};

const orderByASCDESC = (array, search) => {
  let n = array.length,
    aux = 0,
    temp = 0;
  for (let i = 0; i < n - 1; i++) {
    aux = i;
    for (let j = i + 1; j < n; j++) {
      let valor1 = valor(array[j].name);
      let valor2 = valor(array[aux].name);
      if (valor1 < valor2 && search === "ASC") aux = j;
      if (valor1 > valor2 && search === "DESC") aux = j;
    }
    temp = array[aux];
    array[aux] = array[i];
    array[i] = temp;
  }
  return array;
};

const orderProduct = (
  array,
  nameCategory,
  orderBy,
  priceStart,
  priceEnd,
  stockBy
) => {
  // ORDEN ASCENDENTE O DESCENDENTE POR NOMBRE
  if (orderBy) {
    return orderByASCDESC(array, orderBy);
  }

  const aux = array.filter((data) => data.nameCategory == nameCategory);
  return aux;
};

const filterProducts = (cardsUser, gender) =>
  cardsUser.filter((data) => data.gender === gender);

module.exports = {
  orderProduct,
  filterProducts,
};
