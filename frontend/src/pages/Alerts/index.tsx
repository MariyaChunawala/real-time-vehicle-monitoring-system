import { useAlerts } from "../../contexts/AlertContext";
import styles from "./style.module.css";
import { FaBell, FaExclamationTriangle, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

export default function AlertPage() {
    const {
        alerts,
        activeAlerts,
        criticalCount,
        warningCount,
        resolvedCount,
        connected,
    } = useAlerts();

    const sortedAlerts = [...alerts].sort(
        (a, b) =>
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime()
    );

    return (
        <div className={styles.alertsPage}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Alerts</h1>
                    <p>Live status and notification history.</p>
                </div>
                <div>
                    <p>
                        Socket:
                        {connected ? " Connected" : " Disconnected"}
                    </p>
                </div>
            </div>

            <div className={styles.statusCards}>
                <div className={styles.statusCard}>
                    <div className={styles.statusCardTitle}>Active Alerts</div>
                    <div className={styles.statusCardValue}>{activeAlerts.length}</div>
                    <div className={`${styles.statusCardBadge} ${styles.active}`}>
                        <FaBell /> Active
                    </div>
                </div>

                <div className={styles.statusCard}>
                    <div className={styles.statusCardTitle}>Critical Alerts</div>
                    <div className={styles.statusCardValue}>{criticalCount}</div>
                    <div className={`${styles.statusCardBadge} ${styles.critical}`}>
                        <FaExclamationTriangle /> Critical
                    </div>
                </div>

                <div className={styles.statusCard}>
                    <div className={styles.statusCardTitle}>Warning Alerts</div>
                    <div className={styles.statusCardValue}>{warningCount}</div>
                    <div className={`${styles.statusCardBadge} ${styles.warning}`}>
                        <FaShieldAlt /> Warning
                    </div>
                </div>

                <div className={styles.statusCard}>
                    <div className={styles.statusCardTitle}>Resolved Alerts</div>
                    <div className={styles.statusCardValue}>{resolvedCount}</div>
                    <div className={`${styles.statusCardBadge} ${styles.resolved}`}>
                        <FaCheckCircle /> Resolved
                    </div>
                </div>
            </div>

            <div className={styles.alertList}>
                <div className={styles.alertListHeader}>
                    <h2>Alert History</h2>
                    <p>{alerts.length} total alerts</p>
                </div>
                <div className={styles.alertListBody}>
                    {sortedAlerts.length > 0 ? (
                        sortedAlerts.map((alert) => (
                            <div key={alert._id} className={styles.alertItem}>
                                <div className={styles.alertLeft}>
                                    <h3 className={styles.alertTitle}>{alert.message}</h3>
                                    <div className={styles.alertMeta}>
                                        <span>{alert.vehicleId}</span>
                                        <span>{alert.type}</span>
                                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div>
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
                        <div className={styles.alertItem}>
                            <p className={styles.previewMessage}>
                                No alerts have been received yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};