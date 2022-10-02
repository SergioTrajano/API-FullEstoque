import { Router } from "express";

import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";
import manufacturerRoute from "./manufacturerRoute";
import productRoute from "./productRoute";
import clientRouter from "./clientRoute";
import purchaseRouter from "./purchaseRoute";
import sellRouter from "./sellRoute";

import validateHeader from "../middlewares/validateHeaderMiddleware";

const router = Router();

router.use(authRouter);

router.use(validateHeader);

router.use(categoryRouter);
router.use(manufacturerRoute);
router.use(productRoute);
router.use(clientRouter);
router.use(purchaseRouter);
router.use(sellRouter);

export default router;
