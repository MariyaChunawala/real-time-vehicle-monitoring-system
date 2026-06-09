const alertService =
    require("./alertService");

let previousSpeed = 0;

const lastAlertTimes = {};

const ALERT_COOLDOWN_MS =
    60 * 1000;

function canCreateAlert(
    alertType
) {

    const now = Date.now();

    const lastTime =
        lastAlertTimes[
        alertType
        ];

    if (
        !lastTime ||
        now - lastTime >
        ALERT_COOLDOWN_MS
    ) {

        lastAlertTimes[
            alertType
        ] = now;

        return true;
    }

    return false;
}

const processAlerts = async (
    telemetry,
    io
) => {

    const alerts = [];

    /*
     * OVERHEATING
     */
    if (
        telemetry.engineTemperature >
        100 &&
        canCreateAlert(
            "OVERHEATING"
        )
    ) {

        const alert =
            await alertService.createAlert(
                "OVERHEATING",
                "CRITICAL",
                "Engine temperature too high",
                telemetry.engineTemperature,
                telemetry.vehicleId
            );

        alerts.push(alert);
    }

    /*
     * LOW FUEL
     */
    if (
        telemetry.fuel < 20 &&
        canCreateAlert(
            "LOW_FUEL"
        )
    ) {

        const alert =
            await alertService.createAlert(
                "LOW_FUEL",
                "WARNING",
                "Fuel level below 20%",
                telemetry.fuel,
                telemetry.vehicleId
            );

        alerts.push(alert);
    }

    /*
     * OVER SPEEDING
     */
    if (
        telemetry.speed > 100 &&
        canCreateAlert(
            "OVER_SPEED"
        )
    ) {

        const alert =
            await alertService.createAlert(
                "OVER_SPEED",
                "WARNING",
                "Vehicle exceeded speed limit",
                telemetry.speed,
                telemetry.vehicleId
            );

        alerts.push(alert);
    }

    const speedDrop =
        previousSpeed -
        telemetry.speed;

    if (
        speedDrop > 25 &&
        canCreateAlert(
            "HARSH_BRAKING"
        )
    ) {

        const alert =
            await alertService.createAlert(
                "HARSH_BRAKING",
                "WARNING",
                "Sudden speed drop detected",
                speedDrop,
                telemetry.vehicleId
            );

        alerts.push(alert);
    }

    previousSpeed =
        telemetry.speed;

    alerts.forEach(alert => {
        io.emit(
            "alert-created",
            alert
        );
    });
};

module.exports = {
    processAlerts
};