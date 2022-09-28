import { Router } from "express";

import { userController } from "../controllers/authController";
import validateSchema from "../middlewares/schemaValidationMiddleware";
import { signUpSchema, signInSchema } from "../schemas/userSchemas";

const router = Router();

router.post("/signUp", validateSchema(signUpSchema), userController.signUp);
router.post("/signIn", validateSchema(signInSchema), userController.signIn);

export default router;
