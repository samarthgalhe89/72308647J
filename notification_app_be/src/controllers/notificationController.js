const getPriorityNotifications = require("../services/priorityService");
const Log = require("../utils/logger");

const fetchPriorityNotifications = async (req, res) => {

    try {

        const notifications =
            await getPriorityNotifications();

        await Log(
            "backend",
            "info",
            "controller",
            "priority notifications fetched"
        );

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications
        });

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            "failed to fetch priority notifications"
        );

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    fetchPriorityNotifications
};