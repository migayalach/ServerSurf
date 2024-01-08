const { createLevel } = require("../controllers/levelController");

const postLevel = (request, response) => {
  const { name } = request.body;
  try {
    const newLevel = createLevel(name);
    response.status(200).json({ create: true, newLevel });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postLevel,
};
