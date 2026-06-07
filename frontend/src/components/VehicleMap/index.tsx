import { telemetryData } from "../../constants/telemetryDummyData";
import Styles from "./style.module.css";

export default function VehicleLocation() {

    const latestTelemetry =
        telemetryData[telemetryData.length - 1];

    return (
        <div className={Styles.locationCard}>

            <div className={Styles.cardTitle}>
                <div>
                    <h3>Vehicle Location</h3>
                    <span>Live GPS Position</span>
                </div>
            </div>

            <div className={Styles.fakeMap}>
                📍
            </div>

            <div className={Styles.coordinates}>

                <div>
                    <span>Latitude</span>

                    <h3>
                        {latestTelemetry.latitude}
                    </h3>
                </div>

                <div>
                    <span>Longitude</span>

                    <h3>
                        {latestTelemetry.longitude}
                    </h3>
                </div>

            </div>

        </div>
    );
}