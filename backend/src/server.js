import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import tourRoutes from "./routes/tours.js";
import bookingRoutes from "./routes/bookings.js";
import promoRoutes from "./routes/promos.js";
import reviewRoutes from "./routes/reviews.js";
import adminRoutes from "./routes/admin.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta