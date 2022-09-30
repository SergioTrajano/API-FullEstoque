import { Router } from "express";

import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";

import validateHeader from "../middlewares/validateHeaderMiddleware";

const router = Router();

router.use(authRouter);

router.use(validateHeader);

router.use(categoryRouter);

export default router;
