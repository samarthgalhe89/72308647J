const axios = require("axios");
const Log = require("../utils/logger");

const PRIORITY_MAP = {
    Placement: 3,
    Result: 2,
    Event: 1
};

const getPriorityNotifications = async () => {

    try {

        await Log(
            "backend",
            "info",
            "service",
            "fetching notifications"
        );

        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/notifications",
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        const notifications = response.data.notifications || [];

        const prioritized = notifications.map((notification) => ({
            ...notification,
            priorityScore:
                PRIORITY_MAP[notification.Type] || 0
        }));

        prioritized.sort((a, b) => {

            if (b.priorityScore !== a.priorityScore) {
                return b.priorityScore - a.priorityScore;
            }

            return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        await Log(
            "backend",
            "info",
            "service",
            "notifications sorted successfully"
        );

        return prioritized.slice(0, 10);

    } catch (error) {

        await Log(
            "backend",
            "error",
            "service",
            "failed to fetch notifications"
        );

        throw error;
    }
};

module.exports = getPriorityNotifications;