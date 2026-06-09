const Alert = require("../models/Alert");

const createAlert = async (
    type,
    severity,
    message,
    value,
    vehicleId
) => {

    return await Alert.create({
        type,
        severity,
        message,
        value,
        vehicleId
    });
};

module.exports = {
    createAlert
};