const express = require("express");

const cors = require("cors");

const telemetryRoutes =
    require("./src/routes/telemetryRoutes");

const settingsRoutes =
    require("./src/routes/settingsRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", telemetryRoutes);

app.use(
    "/api",
    settingsRoutes
);

module.exports = app;