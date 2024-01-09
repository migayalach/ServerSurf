
const createSale = (name) => {
    return name;
};

const getSaleName = (name) => {
    return name;
};

const getSaleId = (id) => {
    return id;
};

const getAllSales = () => {
    return 'Todas las ventas';
};

const putSales = (id) => {
    return `Se actualizó el ${id}`
};

const deleteSales = (id) => {
    return `Se borró la venta ${id}`
};

module.exports = {
    createSale,
    getSaleName,
    getSaleId,
    getAllSales,
    putSales,
    deleteSales
}