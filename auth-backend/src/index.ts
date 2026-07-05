import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";

import connectDB from "./config/db";
import authRoutes from "../src/routes/auth.routes";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5000");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// start server
const startServer = async (): Promise<void> => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();