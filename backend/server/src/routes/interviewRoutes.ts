import { createInterview } from "@/controllers/interview";
import { Router } from "express";

const router = Router();

router.post("/createInterview", createInterview);

export default router;
