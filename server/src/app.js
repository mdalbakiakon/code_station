import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


// building server
const app = express();


// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


export default app;