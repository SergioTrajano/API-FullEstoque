import { Request, Response } from "express";

import { sellService } from "../services/sellService";
import { createSell } from "../repositories/sellRepository";

async function create(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const newSellData: createSell = req.body;

	const newSell = await sellService.create(newSellData, userId);

	res.status(201).send(newSell);
}

export const sellController = {
	create,
};
