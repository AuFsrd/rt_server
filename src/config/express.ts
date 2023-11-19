import express from "express";
import { config } from "dotenv"
import cors from "cors";
import { registerRoutes } from "./routes";

config();

const corsOptions = {
    origin: process.env.CLIENT!,
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

export const createServer = () => {
    const app = express();
    app.use(cors(corsOptions));

    registerRoutes(app);

    return app;
}