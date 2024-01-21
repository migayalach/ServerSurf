const app = require("./src/app");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const { sequelize } = require("./src/dataBase/dataBase");

app.listen(PORT, () => {
  sequelize.sync({ alter: true });
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});
