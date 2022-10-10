import { Router } from "express";
import { testController } from "../controllers/testController";

const router = Router();

router.post("/reset-database", testController.resetDatabase);

export default router;
