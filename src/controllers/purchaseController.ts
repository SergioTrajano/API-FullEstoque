import { Request, Response } from "express";

import { purchaseService } from "../services/purchaseService";
import { createPurchase } from "../repositories/purchaseRepository";

async function create(req: Request, res: Response) {
	const userId = res.locals.userId;
	const newPurchaseData: createPurchase = req.body;

	const newPurchase = await purchaseService.create(newPurchaseData, userId);

	res.status(201).send(newPurchase);
}

async function update(req: Request, res: Response) {
	const userId = res.locals.userId;
	const dataToUpdate: createPurchase = req.body;
	const purchaseId: number = Number(req.params.purchaseId);

	const updatedPurchase = await purchaseService.update(dataToUpdate, userId, purchaseId);

	res.status(200).send(updatedPurchase);
}

export const purchaseController = {
	create,
	update,
};
