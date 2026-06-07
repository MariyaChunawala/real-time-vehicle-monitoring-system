const express = require("express");

const cors = require("cors");

const telemetryRoutes =
    require("./src/routes/telemetryRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", telemetryRoutes);

module.exports = app;