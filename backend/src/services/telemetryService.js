const Telemetry = require("../models/telemetry");

const saveTelemetry = async (data) => {
    return await Telemetry.create(data);
};

module.exports = {
    saveTelemetry
};