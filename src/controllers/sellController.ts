import { Request, Response } from "express";

import { sellService } from "../services/sellService";
import { createSell } from "../repositories/sellRepository";

async function create(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const newSellData: createSell = req.body;

	const newSell = await sellService.create(newSellData, userId);

	res.status(201).send(newSell);
}

async function update(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const dataToUpdate: createSell = req.body;
	const sellId = Number(req.params.sellId);

	const updatedSell = await sellService.update(dataToUpdate, userId, sellId);

	res.status(200).send(updatedSell);
}

export const sellController = {
	create,
	update,
};
