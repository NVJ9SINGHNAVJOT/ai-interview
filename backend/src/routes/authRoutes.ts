import { signUp } from "@/controllers/auth";
import { Router } from "express";

const router = Router();

router.post("/signUp", signUp);

export default router;
