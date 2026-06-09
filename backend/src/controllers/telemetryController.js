const telemetryService = require("../services/telemetryService");
const alertEngine = require("../services/alertEngine");

let io;

const setSocketInstance = (socketIo) => {
    io = socketIo;
};

const receiveTelemetry = async (req, res) => {
    try {
        const telemetryData = req.body;

        const savedTelemetry =
            await telemetryService.saveTelemetry(telemetryData);

        io.emit("telemetry-update", telemetryData);

        await alertEngine.processAlerts(
            savedTelemetry,
            io
        );

        res.status(200).json({
            success: true,
            data: savedTelemetry
        });


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