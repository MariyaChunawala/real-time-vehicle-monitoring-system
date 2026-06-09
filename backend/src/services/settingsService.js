// services/settingsService.js

const Settings =
    require("../models/Settings");

const getSettings =
    async () => {

        let settings =
            await Settings.findOne();

        if (!settings) {

            settings =
                await Settings.create({});
        }

        return settings;
    };

const updateSettings =
    async (data) => {

        return await Settings.findOneAndUpdate(
            {},
            data,
            {
                new: true,
                upsert: true
            }
        );
    };

module.exports = {
    getSettings,
    updateSettings
};