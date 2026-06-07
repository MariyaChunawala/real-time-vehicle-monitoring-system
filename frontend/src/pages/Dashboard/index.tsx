import DashboardHeader from "../../components/Header/DashboardHeader";
import styles from "./style.module.css";
import TelemetryCard from "../../components/TelemetryCard/index.tsx";
import { FaCar, FaGasPump, FaGear } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import { LiveTelemetryChart, LiveTelemetryRPmChart } from "../../components/LiveChart/index.tsx";
import VehicleLocation from "../../components/VehicleMap/index.tsx";
import SystemHealth from "../../components/SystemHealth/index.tsx";
import VechileDetails from "../../components/VehicleDetails/index.tsx";
import { useTelemetry } from "../../contexts/TelemetrySocketContext.tsx";

interface DashboardProps {
    theme: string;
    toggleTheme: () => void;
}

export default function Dashboard({ theme, toggleTheme }: DashboardProps) {

    const { telemetry, history } = useTelemetry();

    const currentTelemetry = telemetry ?? {
        vehicleId: "N/A",
        speed: 0,
        fuel: 0,
        temperature: 0,
        rpm: 0,
        latitude: 0,
        longitude: 0,
        timestamp: "Waiting for data",
    };

    const getFuelStatus = (fuel: number) => {
        if (fuel < 20) return "Low Fuel";

        if (fuel < 50) return "Medium Fuel";

        return "Fuel Sufficient";
    };

    const getTemperatureStatus = (
        temp: number
    ) => {
        if (temp > 100)
            return "Engine Overheating";

        return "Normal Engine Temperature";
    };


    return (
        <div className={styles.dashboard}>
            <main className={styles.content}>

                <header className={styles.header}>
                    <DashboardHeader theme={theme} toggleTheme={toggleTheme} />
                </header>

                <section className={styles.summaryCards}>

                    <TelemetryCard
                        title="Speed"
                        value={telemetry?.speed != null ? `${telemetry.speed} km/h` : "N/A"}
                        icon={<FaCar style={{ color: "#2563FF", fontSize: "24px" }} />}
                        status="Normal Speed"
                    />

                    <TelemetryCard
                        title="Fuel"
                        value={telemetry?.fuel != null ? `${telemetry.fuel}%` : "N/A"}
                        icon={<FaGasPump style={{ color: "#2563FF", fontSize: "24px" }} />}
                        status={getFuelStatus(telemetry?.fuel || 0)}
                    />

                    <TelemetryCard
                        title="Temperature"
                        value={telemetry?.temperature != null ? `${telemetry.temperature}°C` : "N/A"}
                        icon={<CiTempHigh style={{ color: "#2563FF", fontSize: "24px" }} />}
                        status={getTemperatureStatus(telemetry?.temperature || 0)}
                    />

                    <TelemetryCard
                        title="RPM"
                        value={telemetry?.rpm != null ? `${telemetry.rpm}` : "N/A"}
                        icon={<FaGear style={{ color: "#2563FF", fontSize: "24px" }} />}
                        status="Engine Stable"
                    />

                </section>

                <section className={styles.middleSection}>

                    <div className={styles.chartCard}>
                        <LiveTelemetryChart data={history} />
                    </div>

                    <div className={styles.mapCard}>
                        <VehicleLocation telemetry={telemetry} />
                    </div>

                </section>

                <section className={styles.middleSection}>

                    <div className={styles.rpmCard}>
                        <LiveTelemetryRPmChart data={history} />
                    </div>

                    <div className={styles.healthCard}>
                        <SystemHealth
                            fuel={telemetry?.fuel ?? 0}
                            engineTemperature={telemetry?.temperature ?? 0}
                            rpm={telemetry?.rpm ?? 0}
                        />
                    </div>
                </section>

                <section className={styles.bottomSection}>

                    <div className={styles.vehicleCard}>
                        <VechileDetails telemetry={currentTelemetry} />
                    </div>

                </section>

            </main>

        </div >
    );
}