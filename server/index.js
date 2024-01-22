const app = require("./src/app");
require("dotenv").config();
const PORT = process.env.PORT;

const { sequelize } = require("./src/dataBase/dataBase");

app.listen(PORT, () => {
  sequelize.sync({ force: true });
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});
