import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import serverKey from "@/middlewares/serverKey";
import logging from "@/middlewares/logging";
import { origins } from "@/config/corsOptions";

const app = express();

app.use(
  cors({
    origin: origins,
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

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "server is up and running.",
  });
});

export default app;
