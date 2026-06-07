import type { Telemetry } from "../../types/telemetry";
import Styles from "./style.module.css";

interface VehicleLocationProps {
    telemetry: Telemetry | null;
}

export default function VehicleLocation({ telemetry }: VehicleLocationProps) {

    const latitude = telemetry?.latitude ?? "N/A";
    const longitude = telemetry?.longitude ?? "N/A";

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
                        {latitude}
                    </h3>
                </div>

                <div>
                    <span>Longitude</span>

                    <h3>
                        {longitude}
                    </h3>
                </div>

            </div>

        </div>
    );
}