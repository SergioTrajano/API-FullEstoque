import { Router } from "express";

import { userController } from "../controllers/authController";

const router = Router();

router.post("/signUp", userController.signUp);

export default router;
