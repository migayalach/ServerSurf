const { app, server } = require("./src/app");
const { sequelize } = require("./src/dataBase/dataBase");
require("dotenv").config();
const PORT = process.env.PORT;

server.listen(PORT, () => {
  sequelize.sync({ alter: true });
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});
