import { Request, Response } from "express";

import { manufacturerService } from "../services/manufacturerService";
import { createManufacture } from "../repositories/manufacturerRepository";

async function create(req: Request, res: Response) {
	const newManufacturerData: createManufacture = req.body;
	const userId: number = res.locals.userId;

	const newManufacturer = await manufacturerService.create(newManufacturerData, userId);

	res.status(201).send(newManufacturer);
}

export const manufacturerController = {
	create,
};
