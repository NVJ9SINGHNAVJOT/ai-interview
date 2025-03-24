import { adminLogin, adminOtp, adminSignup } from "@/controllers/admin";
import { Router } from "express";

const router = Router();

router.post("/otp", adminOtp);
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

export default router;
