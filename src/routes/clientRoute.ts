import { Router } from "express";

import validateSchema from "../middlewares/schemaValidationMiddleware";
import { createClientSchema } from "../schemas/clientSchema";
import { clientController } from "../controllers/clientController";

const router = Router();

router.post("/clients", validateSchema(createClientSchema), clientController.create);

router.put("/clients/:clientId", validateSchema(createClientSchema), clientController.update);

export default router;
