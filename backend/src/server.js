import express from "express";
import { ENV } from "./config/env.js";

const server = express();
const PORT = ENV.PORT || 8001;
console.log("env:", ENV );

server.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
    })
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
