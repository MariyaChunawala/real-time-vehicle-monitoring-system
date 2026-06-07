const telemetryService = require("../services/telemetryService");

let io;

const setSocketInstance = (socketIo) => {
    io = socketIo;
};

const receiveTelemetry = async (req, res) => {
    try {
        const telemetryData = req.body;

        const savedTelemetry =
            await telemetryService.saveTelemetry(telemetryData);

        io.emit("telemetry-update", savedTelemetry);

        res.status(200).json({
            success: true,
            data: savedTelemetry
        });

        console.log("Telemetry received:", telemetryData);

    } catch (error) {
        console.log("Telemetry receive error:", error);

        res.status(500).json({
            success: false
        });
    }
};

module.exports = {
    receiveTelemetry,
    setSocketInstance
};