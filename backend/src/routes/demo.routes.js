import express from "express";
import { runScraper } from "../controllers/demo.controller.js";

const router = express.Router();

router.post("/run-scraper", runScraper);

export default router;