import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";


// building server
const app = express();


// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes);


export default app;