import { Router } from "express";

import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";
import manufacturerRoute from "./manufacturerRoute";

import validateHeader from "../middlewares/validateHeaderMiddleware";

const router = Router();

router.use(authRouter);

router.use(validateHeader);

router.use(categoryRouter);
router.use(manufacturerRoute);

export default router;
