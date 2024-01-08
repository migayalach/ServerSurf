const { createLevel, getNameLevel, getLevelId, getAllLevel } = require("../controllers/levelController");

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
      const userName = getNameLevel(name);
      response.status(200).json(userName);
    } else {
      const allUser = getAllLevel();
      response.status(200).json(allUser);
    } 
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdLevel = (request, response) => {
  const { id } = request.params;
  try {
    const userFind = getLevelId(id);
    response.status(200).json(userFind);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const deleteUser = (request, response) => {};

module.exports = {
  postLevel,
  getLevelName,
  getIdLevel
};
