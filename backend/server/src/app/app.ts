import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import serverKey from "@/middlewares/serverKey";
import logging from "@/middlewares/logging";
import authRoutes from "@/routes/authRoutes";
import interviewRoutes from "@/routes/interviewRoutes";
import mcqRoutes from "@/routes/mcqRoutes";
import { envs } from "@/config/envs";
const app = express();

app.use(
  cors({
    origin: envs.ALLOWED_ORIGINS,
    credentials: true,
    methods: ["PUT", "PATCH", "POST", "GET", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// logging details
app.use(logging);

// server only accessible with serverKey
app.use(serverKey);

// routes
app.use("/api/v1/auths", authRoutes);
app.use("/api/v1/interviews", interviewRoutes);
app.use("/api/v1/mcqs", mcqRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server is up and running.",
  });
});

export default app;
