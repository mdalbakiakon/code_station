import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import courseRoutes from "./routes/course.routes.js";


// building server
const app = express();


// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/courses', courseRoutes);

export default app;