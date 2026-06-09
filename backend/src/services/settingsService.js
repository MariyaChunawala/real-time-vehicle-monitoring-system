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
        } else {
            const updates = {};

            if (
                settings.criticalAlerts ===
                undefined
            ) {
                updates.criticalAlerts = true;
            }

            if (
                settings.warningAlerts ===
                undefined
            ) {
                updates.warningAlerts = true;
            }

            if (Object.keys(updates).length > 0) {
                settings = await Settings.findOneAndUpdate(
                    {},
                    updates,
                    { new: true }
                );
            }
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