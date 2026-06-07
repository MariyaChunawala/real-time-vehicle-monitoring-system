import DashboardHeader from "../../components/Header/DashboardHeader";
import styles from "./style.module.css";
import TelemetryCard from "../../components/TelemetryCard/index.tsx";
import { FaCar, FaGasPump, FaGear } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import { LiveTelemetryChart, LiveTelemetryRPmChart } from "../../components/LiveChart/index.tsx";
import VehicleLocation from "../../components/VehicleMap/index.tsx";
import SystemHealth from "../../components/SystemHealth/index.tsx";
import VechileDetails from "../../components/VehicleDetails/index.tsx";


interface DashboardProps {
    theme: string;
    toggleTheme: () => void;
}

export default function Dashboard({ theme, toggleTheme }: DashboardProps) {

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
                        value="82 km/h"
                        icon={<FaCar style={{ color: "#2563FF", fontSize: "24px" }} />}
                        status="Normal Speed"
                    />

                    <TelemetryCard
                        title="Fuel"
                        value="65%"
                        icon={<FaGasPump style={{ color: "#2563FF", fontSize: "24px" }} />}
                        status={getFuelStatus(65)}
                    />

                    <TelemetryCard
                        title="Temperature"
                        value="90°C"
                        icon={<CiTempHigh style={{ color: "#2563FF", fontSize: "24px" }} />}
                        status={getTemperatureStatus(90)}
                    />

                    <TelemetryCard
                        title="RPM"
                        value="2850"
                        icon={<FaGear style={{ color: "#2563FF", fontSize: "24px" }} />}
                        status="Engine Stable"
                    />

                </section>

                <section className={styles.middleSection}>

                    <div className={styles.chartCard}>
                        <LiveTelemetryChart />
                    </div>

                    <div className={styles.mapCard}>
                        <VehicleLocation />
                    </div>

                </section>

                <section className={styles.middleSection}>

                    <div className={styles.rpmCard}>
                        <LiveTelemetryRPmChart />
                    </div>

                    <div className={styles.healthCard}>
                        <SystemHealth fuel={65} engineTemperature={90} rpm={2850} />
                    </div>
                </section>

                <section className={styles.bottomSection}>

                    <div className={styles.vehicleCard}>
                        <VechileDetails telemetry={{
                            vehicleId: "VH-1234",
                            speed: 82,
                            fuel: 65,
                            engineTemperature: 90,
                            rpm: 2850,
                            latitude: 37.7749,
                            longitude: -122.4194,
                            timestamp: "2024-06-01 14:30:00"
                        }} />
                    </div>

                </section>

            </main>

        </div >
    );
}