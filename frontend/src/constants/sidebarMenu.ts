import {
    FaTachometerAlt,
    FaCar,
    FaMapMarkedAlt,
    FaBell,
    FaHistory,
    FaChartLine,
    FaCog
} from "react-icons/fa";

export const sidebarMenu = [
    {
        label: "Dashboard",
        key: "dashboard",
        path: "/",
        icon: FaTachometerAlt,
    },
    // {
    //     label: "Vehicles",
    //     key: "vehicles",
    //     path: "/vehicles",
    //     icon: FaCar,
    // },
    // {
    //     label: "Map View",
    //     key: "map",
    //     path: "/map",
    //     icon: FaMapMarkedAlt,
    // },
    {
        label: "Alerts",
        key: "alerts",
        path: "/alerts",
        icon: FaBell,
    },
    {
        label: "History",
        key: "history",
        path: "/history",
        icon: FaHistory,
    },
    // {
    //     label: "Analytics",
    //     key: "analytics",
    //     path: "/analytics",
    //     icon: FaChartLine,
    // },
    {
        label: "Settings",
        key: "settings",
        path: "/settings",
        icon: FaCog,
    },
];