import { Router } from "express";

import { categoryController } from "../controllers/categoryController";
import { createCategorySchema } from "../schemas/categorySchemas";
import validateSchema from "../middlewares/schemaValidationMiddleware";
import validateHeader from "../middlewares/validateHeaderMiddleware";

const router = Router();

router.post("/categories", validateSchema(createCategorySchema), categoryController.create);

export default router;
