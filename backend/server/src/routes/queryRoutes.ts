import { createQuery } from "@/controllers/query";
import { Router } from "express";

const router = Router();

router.post("/create", createQuery);

export default router;
