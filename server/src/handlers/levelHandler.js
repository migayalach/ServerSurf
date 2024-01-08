const { createLevel, getNameLevel, getLevelId, getAllLevel, levelDelete, levelUpDate } = require("../controllers/levelController");

const postLevel = (request, response) => {
  const { name } = request.body;
  try {
    const newLevel = createLevel(name);
    response.status(200).json({ create: true, newLevel });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getLevelName = (request, response) => {
  const { name } = request.query;
  try {
    if (name) {
      const levelName = getNameLevel(name);
      response.status(200).json(levelName);
    } else {
      const allLevels = getAllLevel();
      response.status(200).json(allLevels);
    } 
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdLevel = (request, response) => {
  const { id } = request.params;
  try {
    const levelFind = getLevelId(id);
    response.status(200).json(levelFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteLevel = (request, response) => {
  const { id } = request.params;
  try {
    const levelFind = levelDelete(id);
    response.status(200).json(levelFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const levelPut = (request, response) => {
  const { id } = request.body;
  try {
    const upDate = levelUpDate(id);
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
  levelPut
};
