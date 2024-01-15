const {
  createColor,
  colorByName,
  colorById,
  allColor,
  colorDelete,
  colorUpDate,
} = require("../controllers/colorController");

const postColor = async (request, response) => {
  const { name } = request.body;
  try {
    const responseData = await createColor(name);
    response.status(200).json(responseData);
  } catch (error) {
    response.status(400).json({ level: false, error: error.message });
  }
};

const getColorByName = async (request, response) => {
  const {name} = request.query;
  try{
    if(name){
      const colorName= await colorByName(name);
      response.status(200).json(colorName);
    } else {
      const allColors = await allColor();
      response.status(200).json(allColors);
    }
  } catch (error) {
    response.status(400).json({error: error.message});
  }
};

const getColorById = async (request, response) => {
  const { idColor } = request.params;
  try {
    const colorFind = await colorById(idColor);
    response.status(200).json(colorFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteColor = async (request, response) => {
  const { idColor } = request.params;
  try {
    const colorFind = await colorDelete(idColor);
    response.status(200).json(colorFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const upDateColor = async (request, response) => {
  const { idColor, nameColor } = request.body;
  try {
    const upDateColor = await colorUpDate(idColor, nameColor);
    response.status(200).json(upDateColor);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postColor,
  getColorByName,
  getColorById,
  deleteColor,
  upDateColor,
};
