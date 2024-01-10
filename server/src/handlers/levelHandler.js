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

const getIdLevel = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const levelFind = await getLevelId(idLevel);
    response.status(200).json(levelFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteLevel = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const levelFind = await levelDelete(idLevel);
    response.status(200).json(levelFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const levelPut = async (request, response) => {
  const { idLevel, nameLevel } = request.body;
  try {
    const upDate = await levelUpDate(idLevel, nameLevel);
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
