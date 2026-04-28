import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import jobRoutes from "./routes/jobs.routes.js";
import userRoutes from "./routes/user.routes.js";
import demoRoutes from "./routes/demo.routes.js";



import "./cron/scraper.cron.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*"
}));
app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);
app.use("/api/demo", demoRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});