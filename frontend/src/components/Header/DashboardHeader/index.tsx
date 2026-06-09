import { useState } from "react";
import styles from "./style.module.css";
import {
    FaBell,
    FaMoon,
    FaSun
} from "react-icons/fa";
import { useAlerts } from "../../../contexts/AlertContext";

interface DashboardHeaderProps {
    theme: string;
    toggleTheme: () => void;
    onNavigateAlerts: () => void;
}

export default function DashboardHeader({ theme, toggleTheme, onNavigateAlerts }: DashboardHeaderProps) {

    const [showNotifications, setShowNotifications] = useState(false);

    const { alerts } = useAlerts();

    const recentAlerts = [...alerts]
        .sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
        )
        .slice(0, 5);

    return (
        <header className={styles.header}>

            <div className={styles.headerLeft}>

                <h1>Dashboard Overview</h1>

                <p className={styles.subtitle}>
                    Monitor vehicle telemetry in real time
                </p>

            </div>

            <div className={styles.headerRight}>

                <button className={styles.iconBtn} onClick={() => setShowNotifications(!showNotifications)}>
                    <FaBell style={{ fontSize: '16px' }} />
                </button>

                {showNotifications && (
                    <div className={styles.notificationWrapper}>
                        <div className={styles.notificationDropdown}>
                            <div className={styles.previewHeader}>
                                <div>
                                    <h2>Alerts</h2>
                                    <p>{recentAlerts.length} latest</p>
                                </div>
                                <button onClick={onNavigateAlerts}>View All</button>
                            </div>
                            <div className={styles.previewList}>
                                {recentAlerts.length > 0 ? (
                                    recentAlerts.map((alert) => (
                                        <div key={alert._id} className={styles.previewItem}>
                                            <div className={styles.previewItemHeader}>
                                                <span title={`${alert.vehicleId} • ${alert.type}`}>
                                                    {alert.vehicleId} • {alert.type}
                                                </span>
                                                <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                            <p className={styles.previewMessage}>{alert.message}</p>
                                            <div className={styles.alertMeta}>
                                                <span className={`${styles.alertSeverity} ${styles[alert.severity]}`}>
                                                    {alert.severity}
                                                </span>
                                                <span className={`${styles.alertStatus} ${styles[alert.status]}`}>
                                                    {alert.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.previewItem}>
                                        <p className={styles.previewMessage}>
                                            No recent alerts available.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className={styles.iconBtn}
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    type="button"
                >
                    {theme === "dark" ? <FaSun style={{ fontSize: '16px' }} /> : <FaMoon style={{ fontSize: '16px' }} />}
                </button>

                <div className={styles.profile}>

                    <div className={styles.avatar}
                    >
                        A
                    </div>

                    <div>

                        <h4>Admin</h4>

                        <span>Fleet Admin</span>

                    </div>

                </div>

            </div>

        </header>
    );
}