import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import { createSellSchema } from "../schemas/sellSchema";
import { sellController } from "../controllers/sellController";

const router = Router();

router.post("/sells", validateSchema(createSellSchema), sellController.create);

router.put("/sells/:sellId", validateSchema(createSellSchema), sellController.update);

export default router;
