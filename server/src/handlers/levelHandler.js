const {
  createLevel,
  levelByName,
  levelById,
  allLevel,
  levelDelete,
  levelUpDate,
} = require("../controllers/levelController");

const postLevel = async (request, response) => {
  const { name } = request.body;
  try {
    const responseData = await createLevel(name)
    response.status(200).json(responseData);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getLevelByName = async (request, response) => {
  const { name } = request.query;
  try {
    if (name) {
      const levelName = await levelByName(name);
      response.status(200).json(levelName);
    } else {
      const allLevels = await allLevel();
      response.status(200).json(allLevels);
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getLevelById = async (request, response) => {
  const { idLevel } = request.params;
  try {
    const levelFind = await levelById(idLevel);
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

const upDateLevel = async (request, response) => {
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
  getLevelByName,
  getLevelById,
  deleteLevel,
  upDateLevel,
};