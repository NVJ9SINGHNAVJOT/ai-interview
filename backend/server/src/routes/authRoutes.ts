import { checkUser, logIn, sendOtp, signUp } from "@/controllers/auth";
import { Router } from "express";

const router = Router();

router.post("/otp", sendOtp);
router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/check-user", checkUser);

export default router;
