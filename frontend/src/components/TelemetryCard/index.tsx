import styles from "./style.module.css";

interface TelemetryCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    status: string;
}

export default function TelemetryCard({
    title,
    value,
    icon,
    status,
}: TelemetryCardProps) {
    return (
        <div className={styles.telemetryCard}>

            <div className={styles.cardHeader}>

                <span>{title}</span>

                <span className={styles.cardIcon}>
                    {icon}
                </span>

            </div>

            <h2>{value}</h2>

            <p>{status}</p>

        </div>
    );
}