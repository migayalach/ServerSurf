const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes");
const socketIo = require("./helpers/socketIo");
const app = express();
const server = http.createServer(app);

socketIo(server);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/surf", mainRouter);

module.exports = { app, server };
