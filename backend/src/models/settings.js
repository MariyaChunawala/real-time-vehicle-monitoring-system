// models/Settings.js

const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    maxSpeed: {
        type: Number,
        default: 100
    },

    lowFuelThreshold: {
        type: Number,
        default: 20
    },

    maxTemperature: {
        type: Number,
        default: 100
    },

    maxRpm: {
        type: Number,
        default: 5500
    }
});

module.exports =
    mongoose.model(
        "Settings",
        settingsSchema
    );