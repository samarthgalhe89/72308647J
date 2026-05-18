const express = require("express");
const cors = require("cors");

const Log = require("./utils/logger");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend Running Successfully"
    });
});

app.get("/test-log", async (req, res) => {

    await Log(
        "backend",
        "info",
        "route",
        "test route working"
    );

    res.json({
        success: true,
        message: "Logger Working"
    });
});

module.exports = app;