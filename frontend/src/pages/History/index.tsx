import { useTelemetry } from "../../contexts/TelemetrySocketContext";
import { useState } from "react";
import Style from "./style.module.css";

export default function HistoryPage(props: any) {
    const { history } = useTelemetry();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEndDate(event.target.value);
    };

    const exportToCSV = () => {

        if (!history.length) return;

        const headers = [
            "Vehicle ID",
            "Speed",
            "Fuel",
            "Engine Temperature",
            "RPM",
            "Latitude",
            "Longitude",
            "Timestamp"
        ];

        const rows = history.map(item => [
            item.vehicleId,
            item.speed,
            item.fuel,
            item.temperature,
            item.rpm,
            item.latitude,
            item.longitude,
            item.timestamp
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob(
            [csvContent],
            { type: "text/csv;charset=utf-8;" }
        );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `telemetry-history-${Date.now()}.csv`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
    };

    const filteredHistory = history.filter((item) => {
        const itemDate = item.timestamp.split("T")[0];

        const afterStart =
            !startDate || itemDate >= startDate;

        const beforeEnd =
            !endDate || itemDate <= endDate;

        return afterStart && beforeEnd;
    });

    const handleResetFilters = () => {
        setStartDate("");
        setEndDate("");
    };

    return (
        <div className={Style.historyPage}>

            <div className={Style.historyHeader}>
                <div>
                    <h1>Vehicle History</h1>
                    <p>
                        Historical telemetry records
                    </p>
                </div>

                <button className={Style.exportBtn} onClick={exportToCSV}>
                    Export CSV
                </button>
            </div>

            <div className={Style.historyFilters}>
                <input
                    type="text"
                    placeholder="Search timestamp..."
                />

                <input type="date"
                    className={Style.dateInput}
                    value={startDate}
                    onChange={handleStartDateChange}
                /> <span style={{ display: 'flex', alignItems: 'center' }}>to</span>

                <input type="date"
                    className={Style.dateInput}
                    value={endDate}
                    onChange={handleEndDateChange}
                />
                <button
                    className={Style.resetButton}
                    onClick={handleResetFilters}
                >
                    Reset
                </button>
            </div>

            <div className={Style.summaryGrid}>

                <div className={Style.summaryCard}>
                    <span>Records</span>
                    <h2>{filteredHistory.length}</h2>
                </div>

                <div className={Style.summaryCard}>
                    <span>Max Speed</span>
                    <h2>
                        {
                            Math.max(
                                ...filteredHistory.map(
                                    item => item.speed
                                ),
                                0
                            )
                        }
                        km/h
                    </h2>
                </div>

                <div className={Style.summaryCard}>
                    <span>Max RPM</span>
                    <h2>
                        {
                            Math.max(
                                ...filteredHistory.map(
                                    item => item.rpm
                                ),
                                0
                            )
                        }
                    </h2>
                </div>

                <div className={Style.summaryCard}>
                    <span>Avg. Temperature</span>
                    <h2>
                        {
                            filteredHistory.length
                                ? Math.round(
                                    filteredHistory.reduce(
                                        (sum, item) =>
                                            sum +
                                            item.temperature,
                                        0
                                    ) / filteredHistory.length
                                )
                                : 0
                        }
                        °C
                    </h2>
                </div>

            </div>

            <div className={Style.historyTableWrapper}>

                <table className={Style.historyTable}>

                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Speed</th>
                            <th>RPM</th>
                            <th>Fuel</th>
                            <th>Temperature</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredHistory
                            .slice()
                            .reverse()
                            .map((item) => (
                                <tr
                                    key={item.timestamp}
                                >
                                    <td>
                                        {
                                            item.timestamp
                                        }
                                    </td>

                                    <td>
                                        {item.speed}
                                        km/h
                                    </td>

                                    <td>
                                        {item.rpm}
                                    </td>

                                    <td>
                                        {item.fuel}%
                                    </td>

                                    <td>
                                        {
                                            item.temperature
                                        }
                                        °C
                                    </td>

                                    <td>
                                        {
                                            item.latitude
                                        }
                                    </td>

                                    <td>
                                        {
                                            item.longitude
                                        }
                                    </td>
                                </tr>
                            ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}