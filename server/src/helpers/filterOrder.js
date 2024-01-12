// const orderProduct = (array, search) => {
//   let n = array.length,
//     aux = 0,
//     temp = 0;
//   for (let i = 0; i < n - 1; i++) {
//     //   aux = i;
//     //   for (let j = i + 1; j < n; j++) {
//     //     let valor1 = valor(array[j][key]);
//     //     let valor2 = valor(array[aux][key]);
//     //     if (valor1 < valor2 && order === "ASC") aux = j;
//     //     if (valor1 > valor2 && order === "DESC") aux = j;
//     //   }
//     //   temp = array[aux];
//     //   array[aux] = array[i];
//     //   array[i] = temp;
//   }
//   return array;
// };

const orderProduct = (
  array,
  nameCategory,
  orderBy,
  priceStart,
  priceEnd,
  stockBy
) => {
  const aux = array.filter((data) => data.nameCategory == nameCategory);
  return aux;
};

const valor = (text) => {
  let character = text.split("")[0];
  return character.charCodeAt();
};

const filterProducts = (cardsUser, gender) =>
  cardsUser.filter((data) => data.gender === gender);

module.exports = {
  orderProduct,
  filterProducts,
};
