import { Request, Response } from "express";

import { categoryService } from "../services/categoryService";
import { createCategory } from "../repositories/categoryRepository";
import { request } from "http";

async function create(req: Request, res: Response) {
	const newCateogryData: createCategory = req.body;
	const userId: number = res.locals.userId;

	const newCateogry = await categoryService.create(newCateogryData, userId);

	res.status(201).send(newCateogry);
}

async function update(req: Request, res: Response) {
	const dataToUpdate = req.body;
	const categoryId: number = Number(req.params.categoryId);
	const userId: number = res.locals.userId;

	const updatedCategory = await categoryService.update(dataToUpdate, categoryId, userId);

	res.status(200).send(updatedCategory);
}

async function remove(req: Request, res: Response) {
	const categoryId: number = Number(req.params.categoryId);
	const userId: number = res.locals.userId;

	await categoryService.remove(categoryId, userId);

	res.sendStatus(200);
}

export const categoryController = {
	create,
	update,
	remove,
};
