const { Op } = require('sequelize');
const { Brand } = require('../dataBase/dataBase');

const createBrand = async (name) => {

  const uppercaseName = name.toUpperCase();
  const brandExist = await Brand.findOne({
    where: {
      brandName: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  
  if (brandExist) {
    return {
      level: false,
      message: `Ya existe esta marca con ese nombre: ${brandExist.brandName}`,
      data: []
    }
  } else {
    await Brand.create({
      brandName: uppercaseName
    });
  }

  const { data } = await allBrand()
  return {
    level: true,
    message: `Marca ${uppercaseName} creada con éxito`,
    data
  };
};

const brandByName = async (name) => {
  const uppercaseName = name.toUpperCase();
  const brand = await Brand.findAll({
    where: {
      brandName: {
        [Op.iLike]: `%${name}%`
      }
    }
  });

  if (brand.length) {
    return {
      level: true,
      message: `Marca ${uppercaseName} encontrada`,
      data: brand
    }
  } else {
    return {
      level: false,
      message: `La marca ${uppercaseName} no esta creada`,
      data: []
    }
  }
};

const brandById = async (idBrand) => {
  const idBrands = await Brand.findOne({ where: { idBrand } });
  console.log(idBrand)
  if (idBrands) {
    return {
      level: true,
      message: `Marca con ID: ${idBrand} encontrada`,
      data: [{
        idBrand: idBrands.idBrand,
        name: idBrands.brandName
      }]
    }
  } else {
    return {
      level: false,
      message: `La marca con ID: ${idBrand} no está creada`,
      data: []
    }
  }
};

const allBrand = async () => {
  const dataBrand = await Brand.findAll();

  const formatteData = {
    level: true,
    message: 'Lista de marcas',
    data: dataBrand.map(brand => ({
      idBrand: brand.idBrand,
      brandName: brand.brandName
    }))
  }
  return formatteData;
};

const brandDelete = async (idBrand) => {
  const brandExisting = await Brand.findOne({ where: { idBrand } }, { attributes: ['brandName'] });

  if (!brandExisting) {
    return {
      level: false,
      message: `No existe la marca con ID: ${idBrand} para eliminar`,
      data: []
    }
  }

  const deleted = await Brand.destroy({ where: { idBrand } });
  const { data } = await allBrand()
  if (deleted) {
    return {
      level: true,
      message: `Marca ${brandExisting.brandName} eliminada exitosamente`,
      data
    }
  }
};

const brandUpDate = async (idBrand, brandName) => {
  const upperCaseName = brandName.toUpperCase();
  const brandExisting = await Brand.findOne({ where: { idBrand } });

  if (!brandExisting) {
    return {
      level: false,
      message: `No existe la marca con ID: ${idBrand} para actualizar`,
      data: []
    }
  } else {
    brandExisting.brandName = upperCaseName;
    await brandExisting.save();
    const { data } = await allBrand();
    return {
      level: true,
      message: `Marca con ID: ${idBrand} actualizada exitosamente: ${upperCaseName}`,
      data
    };
  }
};

module.exports = {
  createBrand,
  brandByName,
  brandById,
  allBrand,
  brandDelete,
  brandUpDate
};