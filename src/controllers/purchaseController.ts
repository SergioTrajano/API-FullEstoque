import { Request, Response } from "express";

import { purchaseService } from "../services/purchaseService";
import { createPurchase } from "../repositories/purchaseRepository";

async function create(req: Request, res: Response) {
	const userId = res.locals.userId;
	const newPurchaseData: createPurchase = req.body;

	const newPurchase = await purchaseService.create(newPurchaseData, userId);

	res.status(201).send(newPurchase);
}

export const purchaseController = {
	create,
};
