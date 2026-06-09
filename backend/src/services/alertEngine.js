const alertService =
    require("./alertService");

const settingsService =
    require("./settingsService");

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

    const settings =
        await settingsService
            .getSettings();

    /*
     * OVERHEATING
     */
    if (
        telemetry.temperature >
        settings.maxTemperature &&
        settings.criticalAlerts &&
        canCreateAlert(
            "OVERHEATING"
        )
    ) {
        const alert =
            await alertService.createAlert(
                "OVERHEATING",
                "CRITICAL",
                "Engine temperature too high",
                telemetry.temperatureemperature,
                telemetry.vehicleId
            );
        alerts.push(alert);
    }

    /*
     * LOW FUEL
     */
    if (
        telemetry.fuel < settings.lowFuelThreshold &&
        settings.warningAlerts &&
        canCreateAlert(
            "LOW_FUEL"
        )
    ) {

        const alert =
            await alertService.createAlert(
                "LOW_FUEL",
                "WARNING",
                `Fuel level below ${settings.lowFuelThreshold}%`,
                telemetry.fuel,
                telemetry.vehicleId
            );

        alerts.push(alert);
    }

    /*
     * OVER SPEEDING
     */
    if (
        telemetry.speed >
        settings.maxSpeed &&
        settings.warningAlerts &&
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
        settings.warningAlerts &&
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