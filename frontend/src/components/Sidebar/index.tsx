import styles from "./style.module.css";
import { sidebarMenu } from "../../constants/sidebarMenu";
import { FaCarRear } from "react-icons/fa6";

export default function Sidebar(props: any) {
    const { setIsActivePage } = props;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoSection}>
                <div className={styles.logoIcon}>
                    <FaCarRear />
                </div>

                <div className={styles.logoText}>
                    <h2 className={styles.title}>VMS</h2>
                    <p className={styles.subtitle}>Vehicle Monitoring System</p>
                </div>
            </div>

            <nav>
                {sidebarMenu.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.key}
                            className={styles.menuItem}
                            onClick={() => setIsActivePage(item.key)}
                        >
                            <Icon />

                            <span>{item.label}</span>
                        </div>
                    );
                })}
            </nav>

            <div className={styles.systemStatus}>
                <h4 className={styles.statusTitle}>System Status</h4>

                <div className={styles.online}>
                    ● All Systems Operational
                </div>
            </div>
        </aside>
    );
}