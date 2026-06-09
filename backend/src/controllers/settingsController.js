const settingsService =
    require("../services/settingsService");

const getSettings =
    async (req, res) => {

        const settings =
            await settingsService.getSettings();

        res.json({
            success: true,
            data: settings
        });
    };

const updateSettings =
    async (req, res) => {

        const settings =
            await settingsService.updateSettings(
                req.body
            );

        res.json({
            success: true,
            data: settings
        });
    };

module.exports = {
    getSettings,
    updateSettings
};