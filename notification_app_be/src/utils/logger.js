const axios = require("axios");
require("dotenv").config();

const Log = async (stack, level, pkg, message) => {
    try {

        const response = await axios.post(
            "http://4.224.186.213/evaluation-service/logs",
            {
                stack,
                level,
                package: pkg,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        console.log("Log Created:", response.data);

    } catch (error) {

        console.log(
            "Logger Error:",
            error.response?.data || error.message
        );
    }
};

module.exports = Log;