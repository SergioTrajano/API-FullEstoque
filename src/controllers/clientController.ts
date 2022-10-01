import { Request, Response } from "express";

import { clientService } from "../services/clientService";
import { createClient } from "../repositories/clientRepository";

async function create(req: Request, res: Response) {
	const newClientData: createClient = req.body;
	const userId: number = res.locals.userId;

	const newClient = await clientService.create(newClientData, userId);

	res.status(201).send(newClient);
}

export const clientController = {
	create,
};
