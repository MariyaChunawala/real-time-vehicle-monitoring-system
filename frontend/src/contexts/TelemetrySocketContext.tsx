import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import axios from "axios";
import { io, Socket } from "socket.io-client";
import type { Telemetry } from "../types/telemetry";

interface TelemetryContextType {
    telemetry: Telemetry | null;
    history: Telemetry[];
    connected: boolean;
}

const TelemetryContext =
    createContext<TelemetryContextType | null>(
        null
    );

const socket: Socket = io(
    "http://localhost:5000"
);

export const TelemetryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [telemetry, setTelemetry] =
        useState<Telemetry | null>(null);

    const [history, setHistory] =
        useState<Telemetry[]>([]);

    const [connected, setConnected] =
        useState(false);

    useEffect(() => {
        console.log("Telemetry state changed", telemetry);
    }, [telemetry]);

    useEffect(() => {
        const fetchTelemetry = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/telemetry/history"
                );

                if (response.data?.success) {
                    const historyData: Telemetry[] = response.data.data || [];
                    setHistory(historyData);

                    if (historyData.length > 0) {
                        setTelemetry(historyData[historyData.length - 1]);
                    }
                }
            } catch (error) {
                console.error("Failed to load initial telemetry:", error);
            }
        };

        fetchTelemetry();

        socket.on("connect", () => {
            setConnected(true);

            console.log("Connected:", socket.id);
        });

        socket.on("connect_error", (error) => {
            console.error("Socket connect error:", error);
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        const handleTelemetryUpdate = (data: Telemetry) => {
            console.log("Received telemetry update:", data);
            setTelemetry(data);
            setHistory((prev) => [
                ...prev.slice(-49),
                data,
            ]);
        };

        socket.on("telemetry-update", handleTelemetryUpdate);

        return () => {
            socket.off("connect");
            socket.off("connect_error");
            socket.off("disconnect");
            socket.off("telemetry-update", handleTelemetryUpdate);
        };
    }, []);

    return (
        <TelemetryContext.Provider
            value={{
                telemetry,
                history,
                connected,
            }}
        >
            {children}
        </TelemetryContext.Provider>
    );
};

export const useTelemetry = () => {
    const context =
        useContext(TelemetryContext);

    if (!context) {
        throw new Error(
            "useTelemetry must be used inside TelemetryProvider"
        );
    }
    console.log("Telemetry Context:", context);
    return context;
};