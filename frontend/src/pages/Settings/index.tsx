import { useState, useEffect } from "react";
import styles from "./style.module.css";
import axios from "axios";

export default function SettingsPage(props: any) {

    const [settings, setSettings] =
        useState({
            criticalAlerts: true,
            warningAlerts: true,
            AutoRefresh: true,
            refreshInterval: 2,
            maxSpeed: 100,
            lowFuelThreshold: 20,
            maxTemperature: 100,
            maxRpm: 5500
        });

    useEffect(() => {

        const fetchSettings =
            async () => {

                const response =
                    await axios.get(
                        "http://localhost:5000/api/settings"
                    );

                setSettings(
                    response.data.data
                );
            };

        fetchSettings();

    }, []);

    const saveSettings =
        async () => {

            await axios.put(
                "http://localhost:5000/api/settings",
                settings
            );

            alert(
                "Settings saved"
            );
        };
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
                            disabled
                            style={{
                                cursor: "not-allowed",
                            }}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Vehicle Name
                        </label>

                        <input
                            type="text"
                            defaultValue="Demo Vehicle"
                            readOnly
                            disabled
                            style={{
                                cursor: "not-allowed",
                            }}
                        />
                    </div>
                </div>

                <div className={styles.cardsWrapper}>
                    <div className={styles.card}>
                        <h3>Alerts Notifications</h3>

                        <div className={styles.toggleRow}>
                            <span>
                                Critical Alerts
                            </span>

                            <input
                                type="checkbox"
                                checked={settings.criticalAlerts}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        criticalAlerts: e.target.checked
                                    })
                                }
                            />
                        </div>

                        <div className={styles.toggleRow}>
                            <span>
                                Warning Alerts
                            </span>

                            <input
                                type="checkbox"
                                checked={settings.warningAlerts}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        warningAlerts: e.target.checked
                                    })
                                }
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
                                checked={settings.AutoRefresh}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        AutoRefresh: e.target.checked
                                    })
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <label style={{ color: settings.AutoRefresh ? 'var(--text-primary, #F8FAFC)' : 'var(--text-secondary, #94A3B8   )' }}>
                                Refresh Interval
                            </label>

                            <select
                                value={settings.refreshInterval}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        refreshInterval: Number(e.target.value)
                                    })
                                }
                                disabled={!settings.AutoRefresh}
                                style={{
                                    cursor: settings.AutoRefresh ? "pointer" : "not-allowed",
                                }}
                            >
                                <option value={2000}>
                                    2 Seconds
                                </option >

                                <option value={5000}>
                                    5 Seconds
                                </option>

                                <option value={10000}>
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
                            value={settings.maxSpeed}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    maxSpeed:
                                        Number(
                                            e.target.value
                                        )
                                })
                            }
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Low Fuel Alert
                        </label>

                        <input
                            type="number"
                            value={settings.lowFuelThreshold}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    lowFuelThreshold:
                                        Number(
                                            e.target.value
                                        )
                                })
                            }
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Max Temperature
                        </label>

                        <input
                            type="number"
                            value={settings.maxTemperature}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    maxTemperature:
                                        Number(
                                            e.target.value
                                        )
                                })
                            }
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Max RPM
                        </label>

                        <input
                            type="number"
                            value={settings.maxRpm}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    maxRpm:
                                        Number(
                                            e.target.value
                                        )
                                })
                            }
                        />
                    </div>

                </div>

            </div>

            <button
                className={styles.saveButton}
                onClick={saveSettings}
            >
                Save Settings
            </button>

        </div>
    );
}