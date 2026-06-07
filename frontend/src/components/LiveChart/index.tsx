import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";
import Styles from "./style.module.css";

import { telemetryData } from "../../constants/telemetryDummyData";

export function LiveTelemetryChart() {
    return (
        <div className={Styles.chartCard}>
            <div className={Styles.cardTitle}>
                <div>
                    <h3>Live Telemetry</h3>
                    <span>Real-time data stream</span>
                </div>

                <div className={Styles.liveBadge}>
                    ● Live
                </div>
            </div>

            <div className={Styles.chartBody}>
                <div className={Styles.chartSection}>
                    <div className={Styles.chartSectionTitle}>
                        <h4>Speed, Fuel & Temperature</h4>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={telemetryData}>
                            <CartesianGrid stroke="#1B2A45" />

                            <XAxis dataKey="timestamp" stroke="#94A3B8" />

                            <YAxis stroke="#94A3B8" />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="speed"
                                name="Speed (km/h)"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                dot={false}
                            />

                            <Line
                                type="monotone"
                                dataKey="fuel"
                                name="Fuel (%)"
                                stroke="#22C55E"
                                strokeWidth={2}
                                dot={false}
                            />

                            <Line
                                type="monotone"
                                dataKey="engineTemperature"
                                name="Temp (°C)"
                                stroke="#EF4444"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export function LiveTelemetryRPmChart() {

    return (

        <div className={Styles.chartSection}>
            <div className={Styles.chartSectionTitle}>
                <h4>RPM Trend</h4>
            </div>
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={telemetryData}>
                    <CartesianGrid stroke="#1B2A45" />

                    <XAxis dataKey="timestamp" stroke="#94A3B8" />

                    <YAxis stroke="#94A3B8" />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="rpm"
                        name="RPM"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}