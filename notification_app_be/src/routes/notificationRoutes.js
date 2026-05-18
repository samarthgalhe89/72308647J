const express = require("express");

const {
    fetchPriorityNotifications
} = require("../controllers/notificationController");

const router = express.Router();

router.get(
    "/priority",
    fetchPriorityNotifications
);

module.exports = router;