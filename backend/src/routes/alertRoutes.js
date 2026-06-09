const express =
    require("express");

const Alert =
    require("../models/Alert");

const router =
    express.Router();

router.get(
    "/history",
    async (req, res) => {

        const alerts =
            await Alert.find()
                .sort({
                    timestamp: -1
                });

        res.json({
            success: true,
            data: alerts
        });
    }
);

module.exports = router;