import { createInterview } from "@/controllers/interview";
import { Router } from "express";

const router = Router();

router.post("/create-interview", createInterview);

export default router;
