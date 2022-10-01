import { Router } from "express";

import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";
import manufacturerRoute from "./manufacturerRoute";
import productRoute from "./productRoute";
import clientRouter from "./clientRoute";

import validateHeader from "../middlewares/validateHeaderMiddleware";

const router = Router();

router.use(authRouter);

router.use(validateHeader);

router.use(categoryRouter);
router.use(manufacturerRoute);
router.use(productRoute);
router.use(clientRouter);

export default router;
