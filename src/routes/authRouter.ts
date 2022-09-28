import { Router } from "express";

import { userController } from "../controllers/authController";
import validateSchema from "../middlewares/schemaValidationMiddleware";
import { signUpSchema } from "../schemas/userSchemas";

const router = Router();

router.post("/signUp", validateSchema(signUpSchema), userController.signUp);

export default router;
