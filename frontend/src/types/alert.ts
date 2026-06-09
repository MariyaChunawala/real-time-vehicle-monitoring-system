export interface Alert {
    _id: string;
    type: string;
    severity: string;
    message: string;
    value: number;
    vehicleId: string;
    status: string;
    timestamp: string;
}