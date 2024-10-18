import { signUp } from "@/controllers/auth";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/signUp", signUp);

export default router;
