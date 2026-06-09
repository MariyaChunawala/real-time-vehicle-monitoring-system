import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import axios from "axios";

import { io, Socket } from "socket.io-client";

import type { Alert } from "../types/alert";

interface AlertContextType {
    alerts: Alert[];

    activeAlerts: Alert[];

    criticalCount: number;

    warningCount: number;

    resolvedCount: number;

    loading: boolean;

    connected: boolean;
}

const AlertContext =
    createContext<AlertContextType | null>(
        null
    );

export const AlertProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [alerts, setAlerts] =
        useState<Alert[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [connected, setConnected] =
        useState(false);

    useEffect(() => {

        const fetchAlerts =
            async () => {

                try {

                    const response =
                        await axios.get(
                            "http://localhost:5000/api/alerts/history"
                        );

                    if (
                        response.data?.success
                    ) {

                        setAlerts(
                            response.data.data || []
                        );
                    }

                } catch (error) {

                    console.error(
                        "Failed to load alerts:",
                        error
                    );

                } finally {

                    setLoading(false);
                }
            };

        fetchAlerts();

        const socket: Socket = io("http://localhost:5000");

        socket.on(
            "connect",
            () => {
                setConnected(true);
            }
        );

        socket.on(
            "disconnect",
            () => {

                setConnected(false);
            }
        );

        socket.on(
            "connect_error",
            (error) => {

                console.error(
                    "Alert Socket Error:",
                    error
                );
            }
        );

        const handleAlertCreated =
            (newAlert: Alert) => {
                setAlerts(prev => [
                    newAlert,
                    ...prev,
                ]);
            };

        socket.on(
            "alert-created",
            handleAlertCreated
        );

        return () => {

            socket.off("connect");

            socket.off("disconnect");

            socket.off(
                "connect_error"
            );

            socket.off(
                "alert-created",
                handleAlertCreated
            );
        };

    }, []);

    const activeAlerts =
        alerts.filter(
            alert =>
                alert.status ===
                "ACTIVE"
        );

    const criticalCount =
        alerts.filter(
            alert =>
                alert.severity ===
                "CRITICAL"
        ).length;

    const warningCount =
        alerts.filter(
            alert =>
                alert.severity ===
                "WARNING"
        ).length;

    const resolvedCount =
        alerts.filter(
            alert =>
                alert.status ===
                "RESOLVED"
        ).length;

    return (
        <AlertContext.Provider
            value={{
                alerts,
                activeAlerts,
                criticalCount,
                warningCount,
                resolvedCount,
                loading,
                connected,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};

export const useAlerts = () => {

    const context =
        useContext(
            AlertContext
        );

    if (!context) {

        throw new Error(
            "useAlerts must be used within AlertProvider"
        );
    }

    return context;
};