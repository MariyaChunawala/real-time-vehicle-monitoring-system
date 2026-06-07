import styles from "./style.module.css";
import {
    FaBell,
    FaMoon,
    FaSearch,
    FaSun
} from "react-icons/fa";

interface DashboardHeaderProps {
    theme: string;
    toggleTheme: () => void;
}

export default function DashboardHeader({ theme, toggleTheme }: DashboardHeaderProps) {
    return (
        <header className={styles.header}>

            <div className={styles.headerLeft}>

                <h1>Dashboard Overview</h1>

                <p className={styles.subtitle}>
                    Monitor vehicle telemetry in real time
                </p>

            </div>

            <div className={styles.headerRight}>

                <button className={styles.iconBtn}>
                    <FaBell style={{ fontSize: '16px' }} />
                </button>

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
                        M
                    </div>

                    <div>

                        <h4>Mariya</h4>

                        <span>Fleet Admin</span>

                    </div>

                </div>

            </div>

        </header>
    );
}