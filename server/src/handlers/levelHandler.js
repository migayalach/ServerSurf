const {
  createLevel,
  getNameLevel,
  getLevelId,
  getAllLevel,
  levelDelete,
  levelUpDate,
} = require("../controllers/levelController");

const postLevel = async (request, response) => {
  const { name } = request.body;
  try {
    const newLevel = await createLevel(name);
    response.status(200).json({ create: true, newLevel });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getLevelName = async(request, response) => {
  const { name } = request.query;
  try {
    if (name) {
      const levelName = await getNameLevel(name);
      response.status(200).json(levelName);
    } else {
      const allLevels = await getAllLevel();
      response.status(200).json(allLevels);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdLevel = (request, response) => {
  const { idLevel } = request.params;
  try {
    const levelFind = getLevelId(idLevel);
    response.status(200).json(levelFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteLevel = (request, response) => {
  const { idLevel } = request.params;
  try {
    const levelFind = levelDelete(idLevel);
    response.status(200).json(levelFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const levelPut = (request, response) => {
  const { idLevel } = request.body;
  try {
    const upDate = levelUpDate(idLevel);
    response.status(200).json(upDate);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postLevel,
  getLevelName,
  getIdLevel,
  deleteLevel,
  levelPut,
};
