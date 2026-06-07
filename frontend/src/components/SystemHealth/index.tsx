import Styles from './style.module.css';
import { FaCogs, FaGasPump, FaTachometerAlt, FaThermometerHalf } from "react-icons/fa";

interface Props {
    fuel: number;
    engineTemperature: number;
    rpm: number;
}

export default function EngineStatus({
    fuel,
    engineTemperature,
    rpm,
}: Props) {

    const getEngineStatus = (
        temp: number,
        fuel: number
    ) => {
        if (temp > 105) {
            return "Overheating";
        }

        if (fuel < 15) {
            return "Low Fuel";
        }

        return "Running Normally";
    };

    const calculateHealthScore = (
        fuel: number,
        temp: number
    ) => {

        let score = 100;

        if (fuel < 20) score -= 20;

        if (temp > 95) score -= 15;

        if (temp > 105) score -= 30;

        return score;
    };

    return (
        <div className={Styles.systemHealthCard}>

            <div className={Styles.cardHeader}>
                <h3>System Health</h3>
            </div>

            <div className={Styles.statusItem}>
                <span><FaCogs style={{ color: '#2563FF' }} /> Engine Status</span>
                <strong>{getEngineStatus(engineTemperature, fuel)}</strong>
            </div>

            <div className={Styles.statusItem}>
                <span><FaThermometerHalf style={{ color: '#2563FF' }} /> Temperature</span>
                <strong>{engineTemperature}°C</strong>
            </div>

            <div className={Styles.statusItem}>
                <span><FaGasPump style={{ color: '#2563FF' }} /> Fuel Status</span>
                <strong>{fuel}%</strong>
            </div>

            <div className={Styles.statusItem}>
                <span><FaTachometerAlt style={{ color: '#2563FF' }} /> RPM Status</span>
                <strong>{rpm} RPM</strong>
            </div>

            <div className={Styles.healthScore}>
                <span>Health Score</span>

                <h2>{calculateHealthScore(fuel, engineTemperature)}/100</h2>
            </div>

        </div>
    );
}