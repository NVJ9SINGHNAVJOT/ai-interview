import { createMcq } from "@/controllers/mcq";
import { Router } from "express";

const router = Router();

router.post("/createMcq", createMcq);

export default router;