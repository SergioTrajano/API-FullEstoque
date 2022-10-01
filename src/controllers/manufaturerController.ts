import { Request, Response } from "express";

import { manufacturerService } from "../services/manufacturerService";
import { createManufacture } from "../repositories/manufacturerRepository";

async function create(req: Request, res: Response) {
	const newManufacturerData: createManufacture = req.body;
	const userId: number = res.locals.userId;

	const newManufacturer = await manufacturerService.create(newManufacturerData, userId);

	res.status(201).send(newManufacturer);
}

async function update(req: Request, res: Response) {
	const manufacturerDataToUpdated: createManufacture = req.body;
	const userId: number = res.locals.userId;
	const manufacturerId = Number(req.params.manufacturerId);

	const updatedManufacturer = await manufacturerService.update(manufacturerDataToUpdated, userId, manufacturerId);

	res.status(200).send(updatedManufacturer);
}

async function remove(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const manufacturerId = Number(req.params.manufacturerId);

	await manufacturerService.remove(userId, manufacturerId);

	res.sendStatus(200);
}

async function find(req: Request, res: Response) {
	const userId: number = res.locals.userId;

	const userManufacturers = await manufacturerService.find(userId);

	res.status(200).send(userManufacturers);
}

export const manufacturerController = {
	create,
	update,
	remove,
	find,
};
