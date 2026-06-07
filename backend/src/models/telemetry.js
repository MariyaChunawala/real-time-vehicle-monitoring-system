const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema({
    vehicleId: String,

    speed: Number,

    fuel: Number,

    engineTemperature: Number,

    rpm: Number,

    latitude: Number,

    longitude: Number,

    timestamp: String
});

module.exports = mongoose.model("Telemetry", telemetrySchema);