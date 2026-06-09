import styles from "./style.module.css";

export default function SettingsPage(props: any) {
    return (
        <div className={styles.settingsPage}>

            <div className={styles.header}>
                <h1>Settings</h1>
                <p>
                    Configure vehicle monitoring
                    preferences
                </p>
            </div>

            <div className={styles.settingsGrid}>

                <div className={styles.card}>
                    <h3>Vehicle Information</h3>

                    <div className={styles.field}>
                        <label>
                            Vehicle ID
                        </label>

                        <input
                            type="text"
                            value="VH001"
                            readOnly
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Vehicle Name
                        </label>

                        <input
                            type="text"
                            defaultValue="Demo Vehicle"
                        />
                    </div>
                </div>

                <div className={styles.cardsWrapper}>
                    <div className={styles.card}>
                        <h3>Notifications</h3>

                        <div className={styles.toggleRow}>
                            <span>
                                Enable Alerts
                            </span>

                            <input
                                type="checkbox"
                                defaultChecked
                            />
                        </div>

                        <div className={styles.toggleRow}>
                            <span>
                                Critical Alerts
                            </span>

                            <input
                                type="checkbox"
                                defaultChecked
                            />
                        </div>

                        <div className={styles.toggleRow}>
                            <span>
                                Warning Alerts
                            </span>

                            <input
                                type="checkbox"
                                defaultChecked
                            />
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>
                            Dashboard Preferences
                        </h3>

                        <div className={styles.toggleRow}>
                            <span>
                                Auto Refresh
                            </span>

                            <input
                                type="checkbox"
                                defaultChecked
                            />
                        </div>

                        <div className={styles.toggleRow}>
                            <span>
                                Dark Mode
                            </span>

                            <input
                                type="checkbox"
                                defaultChecked
                            />
                        </div>

                        <div className={styles.field}>
                            <label>
                                Refresh Interval
                            </label>

                            <select>
                                <option>
                                    2 Seconds
                                </option>

                                <option>
                                    5 Seconds
                                </option>

                                <option>
                                    10 Seconds
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>

            <div className={styles.card}>
                <h3>
                    Alert Thresholds
                </h3>

                <div className={styles.thresholdGrid}>

                    <div className={styles.field}>
                        <label>
                            Max Speed
                        </label>

                        <input
                            type="number"
                            defaultValue="100"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Low Fuel Alert
                        </label>

                        <input
                            type="number"
                            defaultValue="20"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Max Temperature
                        </label>

                        <input
                            type="number"
                            defaultValue="100"
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Max RPM
                        </label>

                        <input
                            type="number"
                            defaultValue="5500"
                        />
                    </div>

                </div>

                <button
                    className={styles.saveButton}
                >
                    Save Settings
                </button>

            </div>

        </div>
    );
}