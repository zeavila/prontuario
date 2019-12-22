const appConfig = require("../appConfig");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const serverPort = appConfig.get("server").port;
const serverTimeout = appConfig.get("server").timeout;

const httpServer = express();

httpServer.use(bodyParser.urlencoded({ extended: true }));
httpServer.use(bodyParser.json({ limit: "2kb" }));
httpServer.use(compression());
httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(express.urlencoded({ extended: true }));

xServer = httpServer.listen(serverPort, () => {
  xServer.timeout = serverTimeout;
  console.log(`App Initialized:\t${process.cwd()}`);
  console.log(`Node ${process.version}:\t${process.execPath}`);
  console.log(`Http Port:\t${serverPort}`);
  console.log(`Timeout:\t${xServer.timeout}`);
});

module.exports = httpServer;
