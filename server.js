"use strict";
require("dotenv").config();
const ip = require("ip");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const mongoose = require("mongoose"); // Import Mongoose

const {
  getEndpoints,
  getSpaceForPrintingPath,
  getMethodColor,
} = require("./util/helper");
const { getConnectionPool } = require("./util/db");

app.use(cookieParser());
const router = require("./routes/router");
// Mongoose configuration
const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.green("MongoDB connected successfully!")))
  .catch((err) => console.error(chalk.red("MongoDB connection error:", err)));
app.use(morgan("dev"));
const body_parser = require("body-parser");
const port = process.env.PORT;
const pool = getConnectionPool(); // Assuming getConnectionPool() provides a connection pool
app.use("/storage", express.static("public"));
app.use(body_parser.json());
// app.use(cors());
const allowedOrigins = ["http://localhost:3000", "http://195.35.9.33:8000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Enable the 'Access-Control-Allow-Credentials' header
  })
);

app.use((req, _, next) => {
  req.pool = pool; // Assuming this injects the connection pool into the request object
  next();
}, router);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    console.error(chalk.red("Error:", err));
    res.status(500).send(err.message);
  }
});

app.listen(port, async () => {
  const endpoints = getEndpoints(router);
  console.log("Method" + "            " + "Path");
  console.log("------" + "            " + "-----");
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
