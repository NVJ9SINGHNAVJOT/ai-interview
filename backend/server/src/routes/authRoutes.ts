import { sendOtp, signUp } from "@/controllers/auth";
import { Router } from "express";

const router = Router();

router.post("/sendOtp", sendOtp);
router.post("/signUp", signUp);

export default router;
