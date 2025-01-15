import { createMcq } from "@/controllers/mcq";
import { Router } from "express";

const router = Router();

router.post("/create-mcq", createMcq);

export default router;
