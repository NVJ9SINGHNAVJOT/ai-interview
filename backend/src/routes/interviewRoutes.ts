import { createInterview } from "@/controllers/interview";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/createInterview", createInterview);

export default router;
