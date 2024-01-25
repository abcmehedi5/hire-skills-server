"use strict";
require("dotenv").config();
const ip = require("ip");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const {
  getEndpoints,
  getSpaceForPrintingPath,
  getMethodColor,
} = require("./util/helper");
const { getConnectionPool } = require("./util/db");
const app = express();
const router = require("./routes/router");

app.use(morgan("dev"));
const body_parser = require("body-parser");
const port = process.env.PORT || 5000;
const pool = getConnectionPool();
app.use("/storage", express.static("public"));
app.use(body_parser.json());
app.use(cors());

app.use((req, _, next) => {
  req.pool = pool;
  next();
}, router);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  }
});
app.listen(port, async () => {
  const endpoints = getEndpoints(router);
  console.log("Method" + "            " + "Path");
  console.log("------" + "            " + "-----");
  endpoints.forEach((endpoint) => {
    const cleanedPath = endpoint.path.slice(12);
    const spaces = getSpaceForPrintingPath(endpoint.method, 15);
    console.log(
      getMethodColor(endpoint.method.toUpperCase()) +
        spaces +
        chalk.blueBright(cleanedPath)
    );
  });
  const ipAddress = ip.address();
  console.log(chalk.yellow(`Server is running on http://localhost:${port}`));
  console.log(chalk.yellow(`Server is running on http://${ipAddress}:${port}`));
});
