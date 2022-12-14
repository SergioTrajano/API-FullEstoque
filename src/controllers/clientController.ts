import { Request, Response } from "express";

import { clientService } from "../services/clientService";
import { createClient } from "../repositories/clientRepository";

async function create(req: Request, res: Response) {
	const newClientData: createClient = req.body;
	const userId: number = res.locals.userId;

	const newClient = await clientService.create(newClientData, userId);

	res.status(201).send(newClient);
}

async function update(req: Request, res: Response) {
	const updateClientData: createClient = req.body;
	const userId: number = res.locals.userId;
	const clientId: number = Number(req.params.clientId);

	const updatedClient = await clientService.update(updateClientData, userId, clientId);

	res.status(200).send(updatedClient);
}

async function remove(req: Request, res: Response) {
	const userId = res.locals.userId;
	const clientId = Number(req.params.clientId);

	await clientService.remove(userId, clientId);

	res.sendStatus(200);
}

async function find(req: Request, res: Response) {
	const userId = res.locals.userId;

	const userClients = await clientService.find(userId);

	res.status(200).send(userClients);
}

export const clientController = {
	create,
	update,
	remove,
	find,
};
