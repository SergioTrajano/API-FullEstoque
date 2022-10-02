import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import { createPurchaseSchema } from "../schemas/purchaseSchema";
import { purchaseController } from "../controllers/purchaseController";

const router = Router();

router.post("/purchases", validateSchema(createPurchaseSchema), purchaseController.create);

router.put("/purchases/:purchaseId", validateSchema(createPurchaseSchema), purchaseController.update);

export default router;