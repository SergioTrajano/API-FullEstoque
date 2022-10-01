import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import { createManufacturerSchema } from "../schemas/manufacturerSchema";
import { manufacturerController } from "../controllers/manufaturerController";

const router = Router();

router.post("/manufacturers", validateSchema(createManufacturerSchema), manufacturerController.create);

router.put("/manufacturers/:manufacturerId", validateSchema(createManufacturerSchema), manufacturerController.update);

export default router;
