import { Router } from "express";

import { categoryController } from "../controllers/categoryController";
import { createCategorySchema } from "../schemas/categorySchemas";
import validateSchema from "../middlewares/schemaValidationMiddleware";

const router = Router();

router.post("/categories", validateSchema(createCategorySchema), categoryController.create);

router.put("/categories/:categoryId", validateSchema(createCategorySchema), categoryController.update);

router.delete("/categories/:categoryId", categoryController.remove);

router.get("/categories", categoryController.find);

export default router;
