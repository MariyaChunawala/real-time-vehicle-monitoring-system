import type { Telemetry } from "../../types/telemetry";
import Styles from "./style.module.css";

interface Props {
    telemetry: Telemetry;
}

export default function VehicleDetails({
    telemetry,
}: Props) {
    return (
        <div className={Styles.vehicleDetailsCard}>

            <h3>Vehicle Details</h3>

            <div className={Styles.detailsGrid}>
                <div className={Styles.detailRow}>
                    <span>Vehicle ID</span>
                    <strong>{telemetry.vehicleId}</strong>
                </div>

                <div className={Styles.detailRow}>
                    <span>Current Speed</span>
                    <strong>{telemetry.speed} km/h</strong>
                </div>

                <div className={Styles.detailRow}>
                    <span>Fuel Level</span>
                    <strong>{telemetry.fuel}%</strong>
                </div>

                <div className={Styles.detailRow}>
                    <span>Engine Temp</span>
                    <strong>{telemetry.temperature}°C</strong>
                </div>

                <div className={Styles.detailRow}>
                    <span>RPM</span>
                    <strong>{telemetry.rpm}</strong>
                </div>

                <div className={Styles.detailRow}>
                    <span>Latitude</span>
                    <strong>{telemetry.latitude}</strong>
                </div>

                <div className={Styles.detailRow}>
                    <span>Longitude</span>
                    <strong>{telemetry.longitude}</strong>
                </div>

                <div className={Styles.detailRow}>
                    <span>Last Update</span>
                    <strong>{telemetry.timestamp}</strong>
                </div>
            </div>

        </div>
    );
}