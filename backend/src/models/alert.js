const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    type: String,
    severity: String,
    message: String,
    value: Number,
    vehicleId: String,
    status: {
        type: String,
        default: "ACTIVE"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports =
    mongoose.model("Alert", alertSchema);