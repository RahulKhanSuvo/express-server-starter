import { Router } from "express";

const router = Router();

router.post("/sign-in");
router.post("/sign-up");
router.post("/refresh-token");

export const authRoutes = router;
