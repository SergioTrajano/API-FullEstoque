import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import { createProductSchema } from "../schemas/productSchema";
import { productController } from "../controllers/productController";

const router = Router();

router.post("/products", validateSchema(createProductSchema), productController.create);

router.put("/products/:productId", productController.update);

router.delete("/products/:productId", productController.remove);

export default router;
